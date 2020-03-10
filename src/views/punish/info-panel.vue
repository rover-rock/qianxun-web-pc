<style scoped lang="less">

.header {
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .result {
    font-size: 1.3em;
  }
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
  font-size: 1.1em;
  p{
    text-indent: 2em;
  }
}
p{
  text-indent: 2em;
}
.detail-title {
  text-align: center;
  font-size: 1.3em;
    font-weight: bolder;
    padding: 15px;
}
.detail-subtitle{
  text-align: center;
  padding-bottom: 10px;
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
            <Tag color="volcano">{{item.agency}}</Tag>
            <div v-html="item.title" class="title text-ellipsis"></div>
          </div>
          <div>
            <Tooltip content="点击查看详情" placement="top">
              <Button shape="circle" @click=" showOneRecord(item.url) ">查看详情</Button>
            </Tooltip>
            <span class="date">{{item.date}}</span>
            <a :href="item.url" target="_blank">源</a>
            <span>阅读量</span>
            <Button>收藏</Button>
          </div>
        </div>
        <div class="collapse-panel" :class="{'collapsed':item.collapsed}">
          <Tag color="magenta">内容：</Tag>:
          <span @click="unfold(item)" v-html="item.content"></span>
        </div>
      </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Modal v-model="modalShow"  :scrollable="true" width="800">
        <div slot="header" style="color:#f60;display:flex;justify-content:space-between;align-items:center;">
          <h3>{{result.banner}}</h3>
          <Button shape="circle" icon='ios-heart'  style="margin-right:100px">
            关注
          </Button>          
        </div>
        <div>
          <div>
            <Row>
              <Col span="12">
              <Tag color="success">分&emsp;类</Tag>{{result.category}}
              </Col>
              <Col span="12">
              <Tag color="success">文&emsp;号</Tag>{{result.number}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Tag color="success">主题词</Tag>{{result.keyword}}
              </Col>
              <Col span="12">
              <Tag color="success">索引号</Tag>{{result.sy}}
              </Col>
            </Row>
        </div>
        <div class="modal-main">
           <p class="detail-title" v-html="result.title"></p>
           <p class="detail-subtitle">
             时间：{{result.date}}
           </p>
           <p class="detail-content" v-html="result.content"></p>
        </div>      
        </div>
          
      </Modal>
    </div>
    <Page
    class="pager"
      :total="total"
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
import { get_one_record } from "@/apis/punish";

const { mapActions, mapMutations, mapState } = createNamespacedHelpers("punish");
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
      total: state => state.total
    }), 
    formated_total() {
      return util.format_number(this.total);
    },
    results() {
      let data = this.search_result;
      let keywords = this.$store.state.punish.keywords;
      data.forEach(item => {
        item.content = util.render_multi_keywords_red(
          keywords.content,
          item.content
        ); 
        item.title = util.render_keywords_red(
          keywords.title,
          item.title
        );
      });
      return data;
    },
    search_result: function() {
      return this.$store.state.punish.search_result;
    }
  },
  mounted() {},
  beforeDestroy() {
    this.clear_search_result();
  },
  methods: {
    ...mapActions(["clear_search_result", "search"]),
    ...mapMutations(["set_spin"]),
    showOneRecord(url) {
      get_one_record({ url:url }).then(result => {
        let item = this.result = result.data[0];
        let keywords = this.$store.state.punish.keywords;
        item.content = util.render_multi_keywords_red(
          keywords.content,
          item.content
        );
        item.title = util.render_keywords_red(
          keywords.title,
          item.title
        );
     
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
        ...this.$store.state.punish.keywords,
        current_page: this.current_page,
        page_size: this.page_size,
        sort: this.sort
      }).then(() => this.set_spin(false));
    }
  }
};
</script>
