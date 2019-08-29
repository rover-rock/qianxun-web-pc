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
  .result {
    font-size: 1.3em;
  }
}
.list-container {
  font-size: 1.2em;
  position: relative;
}
.list-item {
  display: flex;
  justify-content: space-between;
  .part1 {
    display: flex;
    align-items: center;
  }
  .title {
    padding: 5px 10px;
    max-width: 400px;
  }
  .title:hover {
    font-weight: bolder;
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
.detail-item{
  font-size: 1.1em;
}
.detail-content {
  font-size: 1.3em;
}
.detail-title {
  margin-bottom: 25px;
  margin-top: 10px;
}
.detail-time{
  font-weight: bolder;
}
</style>
<template>
  <div class="result-panel">
    <div class="header">
      <Checkbox @on-change="checkall()" size="large">{{!check_all ? '全选' : '全不选'}}</Checkbox>
      <div class="result">
        找到
        <span style="color:red;">{{formated_total}}</span> 条结果
      </div>
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
        <div class="list-item">
          <div class="part1" @click="unfold(item)">
            <Checkbox size="large" v-model="item.checked"></Checkbox>
            <Tag color="volcano">{{item.author}}</Tag>
            <div v-html="item.title" class="title text-ellipsis"></div>
          </div>
          <div>
            <Tooltip content="点击查看详情" placement="top">
              <Button shape="circle" @click=" showOneCase(item.title,item.link) ">共{{item.count}}条回复</Button>
            </Tooltip>
            <span class="date">{{item.comment_time}}</span>
            <a :href="item.link" target="_blank">源</a>
            <span>阅读量</span>
            <Button>收藏</Button>
          </div>
        </div>
        <div class="collapse-panel" :class="{'collapsed':item.collapsed}">
          <Tag color="magenta">{{item.question_author}}</Tag>:
          <span @click="unfold(item)" v-html="item.question_text"></span>
          <br />
          <br />
          <span class="author">回复：</span>
          <span v-html="item.comment_text"></span>
        </div>
      </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Modal v-model="modalShow"  :scrollable="true" width="800">
        <div slot="header" style="color:#f60;display:flex;justify-content:space-between;align-items:center;">
          <h3>案例详情</h3>
          <Button shape="circle" icon='ios-heart'  style="margin-right:100px">
            喜欢
          </Button>
          
        </div>
        <div>
          <h3 class="detail-title" v-html="result[0] && result[0].title"></h3>
        <Timeline>
          <TimelineItem class="detail-item" v-for="(item, index) in result" :key="index" color="green">
            <p class="detail-time">{{item.comment_time}}</p>
            <div v-if="!isBlank(item.question_text)">
              <Tag color="success">{{item.question_author}}</Tag>提问：
              <span v-html="item.question_text" class="detail-content"></span>
            </div>
            <div>
              <Tag color="error">{{item.author}}</Tag>回复：
              <span v-html="item.comment_text" class="detail-content"></span>
              
            </div>
            <Divider v-if="index !== result.length-1"></Divider>
          </TimelineItem>
        </Timeline>
        </div>
        
      </Modal>
    </div>
    <Page
      :total="total"
      :current="current_page"
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      show-total
      show-elevator
      show-sizer
    ></Page>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import util from "@/libs/util";
import { get_one_case } from "@/apis/case_data";

const { mapActions, mapMutations, mapState } = createNamespacedHelpers("Case");
export default {
  data() {
    return {
      modalShow: false,
      check_all: false,
      fold_all: true,
      page_size: 10,
      current_page: 1,
      sort: "latest",
      result: []
    };
  }, 
  computed: {
    ...mapState({
      spinShow: state => state.spinShow,
      total: state => state.total,
      search_result:state => state.search_result
    }), 
    formated_total() {
      return util.format_number(this.total);
    },
    results() {
      let data = this.search_result;
      let keywords = this.$store.state.Case.keywords;
      data.forEach(item => {
        item.comment_text = util.render_multi_keywords_red(
          keywords.comment,
          item.comment_text
        );
        item.question_text = util.render_multi_keywords_red(
          keywords.question,
          item.question_text
        );
      });
      return data;
    }
  },
  beforeDestroy() {
    this.clear_search_result();
  },
  methods: {
    ...mapActions(["clear_search_result", "search"]),
    ...mapMutations(["set_spin"]),
    isBlank(str){
      return str === "" || /^[\s↵]+$/.test(str)
    },
    showOneCase(title, link) {
      get_one_case({ title: title, link: link }).then(result => {
        this.result = result.data;
        let keywords = this.$store.state.Case.keywords;
        this.result.forEach(item => {
        item.title = util.render_multi_keywords_red(
          keywords.question,
          item.title
        );
        item.comment_text = util.render_multi_keywords_red(
          keywords.comment,
          item.comment_text
        );
        item.question_text = util.render_multi_keywords_red(
          keywords.question,
          item.question_text
        );
      });
        this.modalShow = true;
      });
    },
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
      // this.$store.state.Case.search_result.sort((a, b) => {
      //   let res = a.comment_time > b.comment_time;
      //   if (type === "earlest") return res ? 1 : -1;
      //   else return res ? -1 : 1;
      // });
      this.sort = type;
      this.current_page = 1;
      this.search_with_params();
    },
    onPageChange(current) {
      this.current_page = current;
      this.search_with_params();
    },
    onPageSizeChange(page_size) {
      this.page_size = page_size;
      this.current_page = 1;
      this.search_with_params();
    },
    search_with_params() {
      this.set_spin(true);
      this.search({
        ...this.$store.state.Case.keywords,
        current_page: this.current_page,
        page_size: this.page_size,
        sort: this.sort
      }).then(() => this.set_spin(false));
    }
  }
};
</script>
