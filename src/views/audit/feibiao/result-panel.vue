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
.detail-item {
  font-size: 1.1em;
}
.detail-content {
  font-size: 1.2em;
}
.detail-title {
  text-align: center;
  font-size: 1.3em;
  font-weight: bolder;
  padding: 15px;
}
.detail-subtitle {
  text-align: center;
  padding-bottom: 10px;
}
.detail-time {
  font-weight: bolder;
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
</style>
<template>
  <div class="result-panel">
    <div class="header">
      <Checkbox @on-change="checkall()" size="large">{{
        !check_all ? "全选" : "全不选"
      }}</Checkbox>
      <div class="result">
        找到
        <span style="color:red;">{{ formated_total }}</span> 条结果
      </div>
      <div>
        <!-- <ButtonGroup shape="circle">
          <Button @click="orderByTime('latest')">最近</Button>
          <Button @click="orderByTime('earlest')">最早</Button>
        </ButtonGroup> -->
        <Button @click="unfoldAll()">{{
          fold_all ? "全部展开" : "全部折叠"
        }}</Button>
      </div>
    </div>
    <Divider></Divider>
    <div class="list-container">
      <Card v-for="(item, index) in results" :key="index">
    <div class="list-item">
      <div class="part1" @click="unfold(item)">
        <Checkbox size="large" v-model="item.checked"></Checkbox>
        <Tag color="volcano">[{{ item.ts_code }}]</Tag>
        <Tag class="date">{{item.shortname}}</Tag>
        <Tag class="date">{{ item.end_date }}</Tag>
        <span style="margin:0 20px;">{{item.audit_agency}}</span>
        <span>{{item.audit_result}}</span>
        <!-- <div v-html="item.title" class="title text-ellipsis"></div> -->
      </div>
      <div>
        <Tooltip content="点击查看详情" placement="top">
          <Button shape="circle" @click="showOne(item)">查看详情</Button>
        </Tooltip>
        
        <Button>收藏</Button>
      </div>
    </div>
    <div class="collapse-panel" :class="{ collapsed: item.collapsed }">
      <Tag color="magenta">{{ item.audit_sign }}</Tag
      >
      <span @click="unfold(item)" v-html="item.content_html"></span>
    </div>
  </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Modal v-model="modalShow" :scrollable="true" width="800">
        <div
          slot="header"
          style="color:#f60;display:flex;justify-content:space-between;align-items:center;"
        >
          <h3>非标意见详情</h3>
          <Button shape="circle" icon="ios-heart" style="margin-right:100px">
            喜欢
          </Button>
        </div>
        <div>
          <div>
            <Row>
              <Col span="12">
                <Tag color="success">公&emsp;&emsp;&emsp;司</Tag>{{ result.ts_code }}
              </Col>
              <Col span="12">
                <Tag color="success">签字注师</Tag
                >{{ result.audit_sign }}
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <Tag color="success">时&emsp;&emsp;&emsp;间</Tag>{{ result.end_date }}
              </Col>
              <Col span="12">
                <Tag color="success">审计收费</Tag>{{ result.province }}
                {{ result.city }} {{ result.audit_fees }}
              </Col>
            </Row>
            <Row>
              
              <Col span="12">
                <Tag color="success">审计事务所</Tag>{{ result.audit_agency }}
              </Col>
              <Col span="12">
                <Tag color="success">审计结果</Tag
                >{{ result.audit_result }}
              </Col>
            </Row>
          </div>
          <div class="modal-main">
            <Steps :current="2" direction="vertical">
              <Step icon='logo-tux' title="描述">
                <p
                  slot="content"
                  class="detail-content"
                  v-html="result.content_html"
                ></p>
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
      search_result: state => state.search_results,
      keywords: state => state.keywords
    }),
    formated_total() {
      return util.format_number(this.total);
    },
    results() {
      let data = this.search_result;
      let keywords = this.keywords;
      data.forEach(item => {
        item.content_html = util.render_multi_keywords_red(keywords.content, item.content_html);
      });
      return data;
    }
  },
  beforeDestroy() {
    this.clear_search_result();
  },
  methods: {
    ...mapActions(["clear_search_result", "get_feibiao"]),
    ...mapMutations(["set_spin"]),
    isBlank(str) {
      return str === "" || /^[\s↵]+$/.test(str);
    },
    showOne(item) {
      this.result = item;
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
      this.get_feibiao({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size,
        sort: this.sort
      }).then(() => this.set_spin(false));
    }
  }
};
</script>
