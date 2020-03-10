<style scoped>

.modal-table{
  border-collapse: collapse;
  width: 100%;
}
.modal-table,tr,td{
  border:1px solid black;
  text-align: center;
}
</style>
<template>
  <div class="result-panel">
      <Table :columns="columns" :data="data_lines" size="small" ref="table" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            class="pager"
            :total="total"
            :current="current_page"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </div>
      <Modal v-model="modalShow" :scrollable="true" width="800">
        <div
          slot="header"
          style="color:#f60;display:flex;justify-content:space-between;align-items:center;"
        >
          <h3>业务预告详情</h3>
        </div>
        <div>
          <div>
            <Row>
              <Col span="12">
                <Tag color="success">公&emsp;&emsp;司</Tag>{{ result.code }}
              </Col>
              <Col span="12">
                <Tag color="success">行&emsp;&emsp;业</Tag
                >{{ result.industry_sw }}
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <Tag color="success">报告年度</Tag>{{ result.end_date }}
              </Col>
              <Col span="12">
                <Tag color="success">公告日期</Tag>{{ result.ann_date }}
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <Tag color="success">业绩类型</Tag>{{ result.type }}
              </Col>
              
            </Row>
          </div>
          <div class="modal-main">
            <p class="detail-title" v-html="result.title"></p>
            <Steps :current="2" direction="vertical">
              <Step icon='logo-tux' title="业绩预告内容">
                <p
                  slot="content"
                  class="detail-content"
                  v-html="result.summary"
                ></p>
              </Step>
              <Step title="业绩变动原因">
                <p
                  slot="content"
                  class="detail-content"
                  v-html="result.change_reason"
                ></p>
              </Step>
            </Steps>
          </div>
        </div>
      </Modal>
</div>
</template>
<script>
import util from "@/libs/util";
import { search_cpa } from "@/apis/audit_data"
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapMutations, mapState } = createNamespacedHelpers("audit");
export default {
  data() {
    return {
      columns: [
        {
          title: "股票代码",
          key: "code",
          width: 110,
          fixed: "left",
          sortable: true
        },
        {
          title: "股票简称",
          key: "secname",
          width: 110,
          sortable: true
        },
        {
          title: "报告年度",
          key: "end_date",
          width: 130,
          sortable: true
        },
        {
          title: "公告日期",
          key: "ann_date",
          width: 130,
          sortable: true
        },
        {
          title: "业绩类型",
          key: "type",
          width: 150,
          sortable: true
        },
        {
          title: "净利润增长幅上限（%）",
          key: "p_change_max",
          width: 150,
          sortable: true
        },
        {
          title: "净利润增长幅上限（%）",
          key: "p_change_max",
          width: 150,
          sortable: true
        },
        {
          title: "净利润增长幅下限（%）",
          key: "p_change_min",
          width: 150,
          sortable: true
        },
        {
          title: "功能",
          key: "audit_sign",
          width: 200,
          render: (h, params) => {
                      let result = params.row
                      
                      return h('a', { props:{href:'#'},on:{ click:()=>{ this.result=result;this.showModal();}}},'详情');
                  }
        }
      ], 
      page_size: 10,
      current_page: 1,
      modalShow:false,
      result:{}
    };
  },
  computed:{
    ...mapState({
      total:state => state.total,
      data_lines:state => state.search_results,
      keywords:state => state.keywords
    })
  },
  mounted() {
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['get_forecast']),
    changePage(page_num) {
      this.current_page = page_num;
      this.search_with_params();
    },
    changePageSize(per_page_count) {
      this.page_size = per_page_count;
      this.current_page = 1;
      this.search_with_params();
    },
    search_with_params() {
      this.get_forecast({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size
      }).then(() => {})
    },
    showModal(){
      this.modalShow = true
    }
  }
};
</script>
