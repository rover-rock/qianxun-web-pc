<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  margin: 0px 45px;
  padding: 10px 45px;
  background: white;
  .part1 {
    display: flex;
    align-items: center;
  }
  .part2 {
    display: flex;
    align-items: center;
  }
  .title {
    padding: 5px 10px;
    max-width: 600px;
  }
  .title:hover {
    font-weight: bolder;
  }
  .date {
    color: gray;
    margin-left: 5px;
  }
  .link_btn {
    margin-left: 5px;
  }
  .download_btn {
    line-height: 15px;
    margin-left: 5px;
    height: 15px;
  }
  .download_btn img {
    width: 15px;
    height: 15px;
  }
}
.body {
  margin: 20px 45px;
  display: flex;
  height: 100%;
  justify-content: center;
  .left-panel {
    width: 300px;
    height: fit-content;
    margin-right: 20px;
    background: white;
    a{
        color: black;
      }
      a:hover{
        color:red;
      }
  }
  .right-panel {
    width: 800px;
    height: 85%;
    background: white;
    .search-bar {
      padding: 5px;
      display: flex;
      .match_num{
        height: 24px;
    line-height: 26px;
    margin-left: 20px;
    font-weight: bolder;
      }
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<template>
  <div style="height:100%;background: #e8e8e8;">
    <div class="header">
      <div class="part1">
        <Tag color="volcano">{{item.code}}</Tag>
        <div v-html="item.secname + ':' + item.title" class="title text-ellipsis"></div>
      </div>
      <div class="part2">
        <span class="date">{{item.time}}</span>
        <a class="link_btn" :href="item.link" target="_blank">源</a>
        <a class="download_btn" :href="item.download_link">
          <img src="../../images/download.png" alt="下载" />
        </a>
      </div>
    </div>
    <div class="body">
      <div class="left-panel">
        <Tabs v-model="active_tab" style="height: 80vh;overflow-y: scroll;">
          <TabPane label="匹配" name="name1" >
            <div style="padding:10px;">
              <a class="matches" v-for="(match, index) in matches" :key="index" @click.prevent="scroll(index,1)">
                <div v-html="match"></div>
                <Divider></Divider>
              </a>
            </div>
            
          </TabPane>
          <TabPane label="导航" name="name2">
            <div style="padding:10px;">
              <a class="matches" v-for="(chapter, index) in item.chapters" :key="index" @click.prevent="scroll(index+1,2)">
                <div v-html="chapter"></div>
                <Divider></Divider>
              </a>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div class="right-panel">
        <div class="search-bar">
          <Input
            @on-search="search"
            style="width:320px;"
            size="small"
            search
            enter-button
            placeholder="搜索内容"
          />
          <Button @click="prev" size="small" style="margin-left:20px;" shape="circle" icon="ios-arrow-up"></Button>
          <Button @click="next" size="small" style="margin-left:5px;" shape="circle" icon="ios-arrow-down"></Button>
          <span class="match_num" v-if="matches.length">
            匹配结果数{{matches.length}}条
          </span>
        </div>
        <iframe id="if" :srcdoc="html" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import { get_one_report } from "@/apis/report";
import { get } from "axios";
import util from '@/libs/util';
export default {
  data() {
    return {
      item: {},
      html:undefined,
      src_html:'',
      keyword: "",
      matches: [],
      temp_matches:[],
      index:0,
      active_tab:'name2'
    };
  },
  mounted() {
    let src = `https://reports-1258622425.cos.ap-guangzhou.myqcloud.com/${this.$route.params.id}.html`
    get(src).then(data => {
      this.html = this.src_html = data.data
    })
    this.get_report(this.$route.params.id);
  },
  beforeDestroy() {},
  methods: {
    get_report(id) {
      get_one_report({ id }).then(res => {
        this.item = res.data;
        });
    },
    search(value) {
      this.keyword = value;
      this.matches = [];
      this.temp_matches = [];
      this.html = this.render_keywords_red(value, this.src_html);
      this.active_tab = 'name1'
      //dom操作的时序问题。下一步操作时，上一步还没有完成，导致null错误。
      setTimeout(() => {
        this.matches = this.temp_matches.map(this.get_line_text);
      },500);
    },
    scroll(index,type) {
      this.index = index;
      let iframe = document.getElementById("if").contentWindow;
      let node = iframe.document.querySelector(`#${type === 1 ? 'cc' : 'catalog'}` + index);
      // var top = node.offsetTop;
      // var cur = node.offsetParent;
      // while (cur !== null) {
      //   top += cur.offsetTop;
      //   cur = cur.offsetParent;
      // }
      let top = this.getElementToPageTop(node)
      iframe.document.querySelector("#page-container").scrollTo(0, top);
    },
    prev(){
      if(this.index <= 0) return;
      this.scroll(this.index - 1,1)
    },
    next(){ 
      if(this.index >= (this.matches.length - 1)) return;
      this.scroll(this.index + 1,1)
    },
    get_line_text(id, index) {
      let iframe = document.getElementById("if").contentWindow.document;
      let node = iframe.querySelector(id);
      while (node.tagName !== "DIV")
        node = node.parentElement;
      let text = node.innerText;
      text ="..." + util.render_keywords_red( this.keyword, text ) + "..."
      return text ;
    },
    render_keywords_red(keywords, text) {
      if (!keywords) return text;
      let str = '(' + keywords.split('').join('(?:\<span class="\.*"><\/span>)?') + ')'
      let reg = new RegExp(str)
      let segments = text.split(reg);
      //数组操作的函数内部，this指针变了。
      let reduce_func = ( acc, seg, index ) => {
        if (index % 2 === 1) {
          acc += `<span id='cc${(index-1)/2}' style='color:red'>${seg}</span>`;
          this.temp_matches.push(`#cc${(index-1)/2}`);
        } else acc += seg;
        return acc
      }
      reduce_func = reduce_func.bind(this)
      return segments.reduce( reduce_func , "" );
    },
    getElementToPageTop(el) {
  if(el.parentElement) {
    return this.getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}
  }
};
</script>
