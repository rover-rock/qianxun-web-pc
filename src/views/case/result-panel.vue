<style scoped lang="less">
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
  .author {
    background: lightblue;
    color: white;
    padding: 6px 8px;
  }
  .title {
    color: red;
    padding: 5px 10px;
  }
  .date {
    color: gray;
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
          <Button @click="orderByTime('latest')">最近</Button>
          <Button @click="orderByTime('earlest')">最早</Button>
        </ButtonGroup>
        <Button @click="unfoldAll()">{{fold_all ? '全部展开' : '全部折叠'}}</Button>
      </div>
    </div>
    <Divider></Divider>
    <div class="list-container">
      <Card v-for="(item, index) in results" :key="index">
        <div class="list-item" @click="unfold(item)">
          <div>
            <Checkbox size="large" v-model="item.checked"></Checkbox>
            <span class="author">{{item.comment_author}}</span>
            <span class="title">{{item.title}}</span>
          </div>
          <div>
            <span class="date">{{item.comment_time}}</span>
            <a :href="item.url" target="_blank">源</a>
            <span>阅读量</span>
            <Button>收藏</Button>
          </div>
        </div>
        <div class="collapse-panel" :class="{'collapsed':item.collapsed}">
          <span class="author">{{item.question_author}}:</span>
           <span v-html="item.question_text"></span>
          <br />
          <br />
          <span class="author">回复：</span>
          <span v-html="item.comment_text"></span>
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
import Vue from "vue";
import { mapState,mapActions } from 'vuex'
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
    ...mapState([
      'search_history',
    ]),
    results() {
        let data = util.get_page_data(this.search_result,this.current_page,this.page_size)
        data.forEach(item => {
          let keywords = this.$store.state.Case.keywords
          item.comment_text = util.render_keywords_red(keywords.comment,item.comment_text)
          item.question_text = util.render_keywords_red(keywords.question,item.question_text)
        })
        return data
    },
    search_result: function() {
      return this.$store.state.Case.search_result
    }
  },
  mounted() {},
  beforeDestroy(){
    this.clear_search_result()
  },
  methods: {
    ...mapActions(['clear_search_result']),
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
    orderByTime(type) {
      //computed属性只能根据它所依赖的数据变化而变化，sort，push这些数组操作无效。
      this.$store.state.Case.search_result.sort((a, b) => {
        let res = a.comment_time > b.comment_time;
        if (type === "earlest") return res ? 1 : -1;
        else return res ? -1 : 1;
      });
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
