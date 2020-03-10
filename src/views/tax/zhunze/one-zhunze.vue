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
    width: 350px;
    height: fit-content;
    margin-right: 20px;
    background: white;
    .chapter-header {
      display: flex;
      align-items: center;
    }
    a {
      color: black;
    }
    a:hover {
      color: red;
    }
  }
  .right-panel {
    width: 800px;
    height: 85%;
    background: white;
    .search-bar {
      padding: 5px;
      display: flex;
      .match_num {
        height: 24px;
        line-height: 26px;
        margin-left: 20px;
        font-weight: bolder;
      }
    }
    iframe {
      width: 100%;
      height: 95%;
      padding: 30px;
    }
  }
}
.subcatalog {
  list-style: none;
  li {
    padding: 5px 15px;
  }
}
.spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.spin-block {
  position: relative;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div style="height:100%;background: #e8e8e8;">
    <div class="header" v-if="item">
      <div class="part1">
        <Tag color="volcano">{{ item.source }}</Tag>
        <div
          v-html="item.type + ':' + item.title"
          class="title text-ellipsis"
        ></div>
      </div>
      <div class="part2">
        <span class="date">{{ item.time }}</span>
        <a class="link_btn" :href="item.link" target="_blank">源</a>
      </div>
    </div>
    <div class="body">
      <div class="left-panel">
        <Tabs
          style="height: 80vh;overflow-y: scroll;"
          ref="match"
        >
          <TabPane label="匹配" name="name1">
            <div style="padding:10px;">
              <a
                class="matches"
                v-for="(match, index) in matches"
                :key="index"
                @click.prevent="scroll(index, 'match')"
              >
                <div v-html="match"></div>
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
          <Button
            @click="prev"
            size="small"
            style="margin-left:20px;"
            shape="circle"
            icon="ios-arrow-up"
          ></Button>
          <Button
            @click="next"
            size="small"
            style="margin-left:5px;"
            shape="circle"
            icon="ios-arrow-down"
          ></Button>
          <span class="match_num" v-if="matches.length">
            匹配结果数{{ matches.length }}条
          </span>
        </div>
        <iframe id="if" :srcdoc="html" frameborder="0"></iframe>
      </div>
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
        <div>加载中...</div>
      </Spin>
    </div>
  </div>
</template>
<script>
import { get_one_zhunze } from "@/apis/tax";
import { get } from "axios";
import util from "@/libs/util";
export default {
  data() {
    return {
      item: undefined,
      html: undefined,
      src_html: "",
      keyword: "",
      matches: [],
      temp_matches: [],
      index: 0,
      spinShow: false
    };
  },
  mounted() {
    this.spinShow = true;
    get_one_zhunze({ link: this.$route.query.link }).then(res => {
      this.html = this.src_html = res.data[0].content;
      this.item = res.data[0];
      this.spinShow = false;
    });
  },
  beforeDestroy() {},
  methods: {
    search(value) {
      this.$refs.match.$el.scrollTo(0, 0);
      this.keyword = value;
      this.matches = [];
      this.temp_matches = [];
      this.html = this.render_keywords_red(value, this.src_html);
      this.active_tab = "name1";
      //dom操作的时序问题。下一步操作时，上一步还没有完成，导致null错误。
      let iframe = document.getElementById("if");
      iframe.onload = () => {
        this.matches = this.temp_matches.map(this.get_line_text);
      };
    },
    scroll(index, type) {
      this.index = index;
      let iframe = document.getElementById("if").contentWindow;
      let node = iframe.document.querySelector(`#cc` + index);
      // if(type == 'match') while( node.tagName != 'P') node = node.parentElement
      let top = this.getElementToPageTop(node);

      iframe.scrollTo(0, top); //文档结构发生变化
    },
    prev() {
      if (this.index <= 0) return;
      this.scroll(this.index - 1, 1);
    },
    next() {
      if (this.index >= this.matches.length - 1) return;
      this.scroll(this.index + 1, 1);
    },
    get_line_text(id, index) {
      let iframe = document.getElementById("if").contentWindow.document;
      let node = iframe.querySelector(id);
      while (node.tagName !== "P") node = node.parentElement;
      let text = node.innerText;
      text = "..." + util.render_keywords_red(this.keyword, text) + "...";
      return text;
    },
    render_keywords_red(keywords, text) {
      if (!keywords) return text;
      let segments = text.split(keywords);
      let reduce_func = (acc, seg, index) => {
        acc += seg;
        if (index !== segments.length - 1) {
          acc += `<span id='cc${index}' style='color:red'>${keywords}</span>`;

          this.temp_matches.push(`#cc${index}`);
        }
        return acc;
      };
      reduce_func = reduce_func.bind(this);
      return segments.reduce(reduce_func, "");
    },
    getElementToPageTop(el) {
      if (el.offsetParent.tagName != 'BODY') {
        return this.getElementToPageTop(el.offsetParent) + el.offsetTop;
      }
      return el.offsetTop;
    }
  }
};
</script>
