<style scoped>
.info-panel {
  background: white;
  margin: 20px;
  padding: 20px;
}
</style>
<template>
  <div class="info-panel">
    <Tabs value="name1">
      <TabPane label="预披露清单" name="name1">
        <Table :columns="columns8" :data="data_lines" size="small" ref="table" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="source_data_lines.length" :current="1" @on-change="changePage" @on-page-size-change="changePageSize" show-total show-elevator show-sizer></Page>
          </div>
        </div>
        <br />
        <Button type="primary" size="large" @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon>导出原始数据
        </Button>
        <Button type="primary" size="large" @click="exportData(2)">
          <Icon type="ios-download-outline"></Icon>导出排序后的数据
        </Button>
      </TabPane>
      <TabPane label="发审会公告" name="name2">发审会公告</TabPane>
    </Tabs>
  </div>
</template>
<script>
import { get_IPO_queue_data } from "@/apis/IPO_data";
export default {
  data() {
    return {
      columns8: [
        {
          title: "序号",
          key: "order",
          width: 100,
          fixed: "left",
          sortable:true
        },
        {
          title: "企业名称",
          key: "name",
          width: 200,
          sortable:true
        },
        {
          title: "保荐机构",
          key: "recommend",
          width: 200,
          sortable:true
        },
        {
          title: "会计师事务所",
          key: "kuaijishi",
          width: 200,
          sortable:true
        },
        {
          title: "律师事务所",
          key: "lvshi",
          width: 200,
          sortable:true
        },
        {
          title: "受理日期",
          key: "date",
          width: 200,
          sortable:true
        },
        {
          title: "审核状态",
          key: "status",
          width: 200,
          sortable:true
        },
        {
          title: "是否已参加抽查抽签或现场检查",
          key: "attend",
          width: 200
        },
        {
          title: "备注",
          key: "ps",
          width: 200
        }
      ],
      data_lines: [],
      source_data_lines:[],
      page_num:1,
      per_page_count:10
    };
  },
  mounted() {
    this.get_IPO_queue_data();
  },
  beforeDestroy() {},
  methods: {
    async get_IPO_queue_data() {
      let data = await get_IPO_queue_data();
      data = data.data;
      this.source_data_lines = data;
      this.changePage(1)
    },
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
    changePage(page_num){
      this.page_num = page_num
      this.calculatePage()
    },
    changePageSize(per_page_count){
      this.per_page_count = per_page_count
      this.calculatePage()
    },
    calculatePage(){
      this.data_lines = this.source_data_lines.slice((this.page_num-1)*this.per_page_count,this.page_num*this.per_page_count)
    }
  }
};
</script>
