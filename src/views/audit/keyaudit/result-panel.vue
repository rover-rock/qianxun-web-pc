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
.detail-item{
  font-size: 1.1em;
}
.detail-content {
  font-size: 1.3em;
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
      <CollapseListItem v-for="(item, index) in results" :item="item" :key="index" @show_detail="showOne">
      </CollapseListItem>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Modal v-model="modalShow"  :scrollable="true" width="800">
        <div slot="header" style="color:#f60;display:flex;justify-content:space-between;align-items:center;">
          <h3>关键审计事项详情</h3>
          <Button shape="circle" icon='ios-heart'  style="margin-right:100px">
            喜欢
          </Button>
          
        </div>
        <div>
          <div>
            <Row>
              <Col span="12">
              <Tag color="success">分&emsp;类</Tag>{{result.category}}
              </Col>
              <Col span="12">
              <Tag color="success">行&emsp;&emsp;&emsp;业</Tag>{{result.thsindustry}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Tag color="success">年&emsp;度</Tag>{{result.annul}}
              </Col>
              <Col span="12">
              <Tag color="success">审计事务所</Tag>{{result.agency}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
              <Tag color="success">地&emsp;区</Tag>{{result.province}} {{result.city}} {{result.country}}
              </Col>
              <Col span="12">
              <Tag color="success">版&emsp;&emsp;&emsp;块</Tag>{{result.plate}}
              </Col>
            </Row>
        </div>
        <div class="modal-main">
           <p class="detail-title" v-html="result.title"></p>
           <Steps :current="2" direction="vertical">
        <Step title="描述" icon="logo-tux" :content="result.info">
        </Step>
        <Step title="应对" :content="result.reply">
        </Step>
    </Steps>
           
           
        </div>      
        </div>
        
      </Modal>
    </div>
    <Page
      class="pager"
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
import CollapseListItem from "@/views/components/collapse-list-item"
const { mapActions, mapMutations, mapState } = createNamespacedHelpers("audit");
export default {
  data() {
    return {
      modalShow: false,
      check_all: false,
      fold_all: true,
      page_size: 10,
      current_page: 1,
      sort: "latest",
      result: {}
    };
  }, 
  computed: {
    ...mapState({
      spinShow: state => state.spinShow,
      total: state => state.total,
      search_result:state => state.search_results,
      keywords:state => state.keywords
    }), 
    formated_total() {
      return util.format_number(this.total);
    },
    results() {
      let data = this.search_result;
      let keywords = this.keywords;
      data.forEach(item => {
        item.title = util.render_multi_keywords_red(
          keywords.title,
          item.title
        );
        item.html = util.render_multi_keywords_red(
          keywords.content,
          item.html
        );
      });
      return data;
    }
  },
  beforeDestroy() {
    this.clear_search_result();
  },
  methods: {
    ...mapActions(["clear_search_result", "get_keyaudit"]),
    ...mapMutations(["set_spin"]),
    isBlank(str){
      return str === "" || /^[\s↵]+$/.test(str)
    },
    showOne(item) {
      this.result = item
      this.modalShow = true;
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
      this.get_keyaudit({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size,
        sort: this.sort
      }).then(() => this.set_spin(false));
    }
  },
  components:{
    CollapseListItem
  }
};
</script>
