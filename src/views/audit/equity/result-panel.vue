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
          <h3>股权质押详情</h3>
        </div>
        <div>
          <div class="modal-main">
                <p
                  slot="content"
                  class="detail-content"
                  v-html="result.summary"
                ></p>
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
          title: "公告日期",
          key: "ann_date",
          width: 130,
          sortable: true
        },
        {
          title: "出质人",
          key: "pledgor",
          width: 200,
          sortable: true
        },
        {
          title: "质权人",
          key: "pledgee",
          width: 150,
          sortable: true
        },
        {
          title: "质押数量（万股）",
          key: "pledge_count",
          width: 150,
          sortable: true
        },
        {
          title: "占总股本比例",
          key: "pledge_ratio",
          width: 150,
          sortable: true
        },
        {
          title: "质押接触数量（万股）",
          key: "relieve_count",
          width: 120,
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
    ...mapActions(['get_equity']),
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
      this.get_equity({
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
