<style scoped>
.info-panel {
  background: white;
  margin: 20px;
  padding: 20px;
}
</style>
<template>
  <div class="info-panel">
      <Table :columns="columns" :data="data_lines" size="small" ref="table" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="$store.state.audit.search_results.length"
            :current="1"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            show-total
            show-elevator
            show-sizer
          ></Page>
        </div>
      </div>
      <br />
      <Button type="primary" size="large" @click="exportData(1)">
        <Icon type="ios-download-outline"></Icon>导出原始数据
      </Button>
      <Button type="primary" size="large" @click="exportData(2)">
        <Icon type="ios-download-outline"></Icon>导出排序后的数据
      </Button>
</div>
</template>
<script>
import util from "@/libs/util";

export default {
  data() {
    return {
      columns: [
        {
          title: "公司代码",
          key: "ts_code",
          width: 130,
          fixed: "left",
          sortable: true
        },
        {
          title: "开始时间",
          key: "ann_date",
          width: 200,
          sortable: true
        },
        {
          title: "结束时间",
          key: "end_date",
          width: 200,
          sortable: true
        },
        {
          title: "会计师事务所",
          key: "audit_agency",
          width: 200,
          sortable: true
        },
        {
          title: "审计意见",
          key: "audit_result",
          width: 200,
          sortable: true
        },
        {
          title: "审计费用",
          key: "audit_fees",
          width: 200,
          sortable: true
        },
        {
          title: "签字注师",
          key: "audit_sign",
          width: 200,
          sortable: true
        }
      ], 
      page_num: 1,
      per_page_count: 10
    };
  },
  computed:{
    data_lines(){
      return util.get_page_data( this.$store.state.audit.search_results, this.page_num, this.per_page_count)
    },
  },
  mounted() {
  },
  beforeDestroy() {},
  methods: {
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "The original data"
        });
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: "Sorting and filtering data",
          original: false
        });
      } else if (type === 3) {
        this.$refs.table.exportCsv({
          filename: "Custom data",
          columns: this.columns8.filter((col, index) => index < 4),
          data: this.data7.filter((data, index) => index < 4)
        });
      }
    },
    changePage(page_num) {
      this.page_num = page_num;
      this.calculatePage();
    },
    changePageSize(per_page_count) {
      this.per_page_count = per_page_count;
      this.calculatePage();
    },
    calculatePage() {
      this.data_lines = this.source_data_lines.slice(
        (this.page_num - 1) * this.per_page_count,
        this.page_num * this.per_page_count
      );
    }
  }
};
</script>
