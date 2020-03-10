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
          key: "ts_code",
          width: 130,
          fixed: "left",
          sortable: true
        },
        {
          title: "股票简称",
          key: "shortname",
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
          title: "公告截止日期",
          key: "end_date",
          width: 200,
          sortable: true
        },
        {
          title: "进度",
          key: "proc",
          width: 150,
          sortable: true
        },
        {
          title: "过期日期",
          key: "exp_date",
          width: 150,
          sortable: true
        },
        {
          title: "回购数量",
          key: "vol",
          width: 150,
          sortable: true
        },
        {
          title: "回购金额",
          key: "amount",
          width: 150,
          sortable: true
        },
        {
          title: "回购最高价",
          key: "high_limit",
          width: 150,
          sortable: true
        },
        {
          title: "回购最低价",
          key: "low_limit",
          width: 150,
          sortable: true
        }
      ], 
      page_size: 10,
      current_page: 1,
      modalShow:false
    };
  },
  computed:{
    ...mapState({
      total:state => state.total,
      data_lines:state => state.search_results,
      keywords:state => state.keywords
    })
  },
  methods: {
    ...mapActions(['get_repurchase']),
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
      this.get_repurchase({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size
      }).then(() => {})
    }
  }
};
</script>
