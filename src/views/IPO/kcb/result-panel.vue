<style scoped>
.info-panel {
  background: white;
  margin: 20px;
  padding: 20px;
}
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
  <div class="info-panel">
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
import { search_cpa } from "@/apis/audit_data"
import { createNamespacedHelpers } from "vuex";
import { pager_mixin } from "@/mixins"
const { mapActions, mapMutations, mapState } = createNamespacedHelpers("IPO");
export default {
  mixins:[ pager_mixin ],
  data() {
    return {
      columns: [
        {
          title: "企业名称",
          key: "name",
          width: 130,
          fixed: "left",
          sortable: true
        },
        {
          title: "保荐机构",
          key: "recommend",
          width: 200,
          sortable: true
        },
        {
          title: "上市板块",
          key: "market",
          width: 140,
          sortable: true
        },
        {
          title: "会计师事务所",
          key: "auditor",
          width: 130,
          sortable: true
        },
        {
          title: "律师事务所",
          key: "lawer",
          width: 130,
          sortable: true
        },
        {
          title: "受理日期",
          key: "date",
          width: 140,
          sortable: true
        },
        {
          title: "审核状态",
          key: "status",
          width: 140,
          sortable: true
        },
        {
          title: "是否已参加抽查抽签或现场检查",
          key: "is_check",
          width: 100,
          sortable: true
        },
        {
          title: "备注",
          key: "notes",
          width: 200,
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
    ...mapActions(['get_sanban']),
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "原始数据"
        });
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: "排序过滤数据",
          original: false
        });
      }
    },
    search_with_params() {
      this.get_sanban({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size
      }).then(() => {})
    }
  }
};
</script>
