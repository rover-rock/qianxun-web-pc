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
          title: "证券代码",
          key: "code",
          width: 130,
          fixed: "left",
          sortable: true
        },
        {
          title: "证券简称",
          key: "secname",
          width: 130,
          sortable: true
        },
        {
          title: "报告年度",
          key: "end_date",
          width: 130,
          sortable: true
        },
        {
          title: "预约披露日期",
          key: "pre_date",
          width: 130,
          sortable: true
        },
        {
          title: "变更日1",
          key: "modify_date1",
          width: 120,
          sortable: true
        },
        {
          title: "变更日2",
          key: "modify_date2",
          width: 120,
          sortable: true
        },
        {
          title: "变更日3",
          key: "modify_date3",
          width: 120,
          sortable: true
        },
        {
          title: "实际披露日期",
          key: "actual_date",
          width: 120,
          sortable: true
        }   
      ], 
      page_size: 10,
      current_page: 1,
      modalShow:false,
      cpa:'',
      cpa_list:[]
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
    ...mapActions(['get_disclosure']),
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
      this.get_disclosure({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size
      }).then(() => {})
    }
  }
};
</script>
