<style scoped lang="less">
.text-ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.result-panel {
  background: white;
  margin: 20px;
  padding: 20px;
}
.header {
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list-container {
  font-size: 1.2em;
}
.list-item {
  display: flex;
  justify-content: space-between;
  .part1{
    display: flex;
  }
  .author {
    background: lightblue;
    color: white;
    padding: 6px 8px;
  }
  .title {
        padding: 5px 10px;
      width: 600px;
    .text-ellipsis;
  }
  .title:hover{
    font-weight: bolder;
  }
  .date {
    color: gray;
  }
  .content{
    .text-ellipsis
  }
}

.collapse-panel {
  padding: 15px 30px;
  transition: height 1s, padding 0.3s;
  .author {
    background: gray;
    color: white;
    padding: 3px 7px;
    border-radius: 5px;
  }
}
.collapsed {
  height: 0;
  padding: 0px 30px;
  overflow: hidden;
}
</style>
<template>
  <div class="result-panel">
    <div class="header">
      <Checkbox @on-change="checkall()" size="large">{{!check_all ? '全选' : '全不选'}}</Checkbox>
      <div>
        <ButtonGroup shape="circle">
          <Button @click="sort_search_result('latest')">最近</Button>
          <Button @click="sort_search_result('earlest')">最早</Button>
        </ButtonGroup>
        <Button @click="unfoldAll()">{{fold_all ? '全部展开' : '全部折叠'}}</Button>
      </div>
    </div>
    <Divider></Divider>
    <div class="list-container">
      <Card v-for="(item, index) in results" :key="index">
        <div class="list-item" @click="unfold(item)">
          <div class="part1">
            <Checkbox size="large" v-model="item.checked"></Checkbox>
            <span class="author">{{item.agency}}</span>
            <p class="title" v-html="item.title"></p>
          </div>
          <div>
            <span class="date">{{item.date}}</span>
            <a :href="item.url" target="_blank">源</a>
            <span>阅读量</span>
            <Button>收藏</Button>
          </div>
        </div>
        <div class="collapse-panel" :class="{'collapsed':item.collapsed}">
           <span class="content" v-html="item.content"></span>
        </div>
      </Card>
    </div>
    <Page
      :total="search_result.length"
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      show-total
      show-elevator
      show-sizer
    ></Page>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import util from "@/libs/util";

export default {
  data() {
    return {
      check_all: false,
      fold_all: true,
      page_size: 10,
      current_page: 1
    };
  },
  computed: {
    results(){
        let data = util.get_page_data(this.$store.state.punish.search_result,this.current_page,this.page_size)
        let keywords = this.$store.state.punish.keywords;
        data.forEach(item => {
          ['content','title'].forEach(key => {
            item[key] = util.render_keywords_red(keywords[key],item[key])
          })          
        })
        return data
    },
    search_result(){
      return this.$store.state.punish.search_result
    }
  },
  mounted() {},
  beforeDestroy() {
    this.clear_search_result()
  },
  methods: {
    ...mapActions(['sort_search_result','clear_search_result']),
    checkall() {
      this.check_all = !this.check_all;
      this.search_result.forEach(item => {
        item.checked = this.check_all;
      });
    },
    unfoldAll() {
      this.fold_all = !this.fold_all;
      this.search_result.forEach(item => {
        item.collapsed = this.fold_all;
      });
    },
    unfold(item) {
      item.collapsed = !item.collapsed;
    },
    onPageChange(current) {
      this.current_page = current;
    },
    onPageSizeChange(page_size) {
      this.page_size = page_size;
    }
  }
};
</script>
