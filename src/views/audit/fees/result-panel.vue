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
      <Modal
        v-model="modalShow"
        title="符合条件的签字注师"
        width="800px">
        <table class="modal-table">
          <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>职位</th>
            <th>专业</th>
            <th>学校</th>
            <th>事务所</th>
            <th>注册时间</th>
            <th>注册文号</th>
          </tr>
          <tr v-for="(item, index) in cpa_list" :key="index">
            <td><a target="_blank" :href="item.url">{{item.name}}</a></td>
            <td>{{item.gender}}</td>
            <td>{{item.duty}}</td>
            <td>{{item.profession}}</td>
            <td>{{item.school}}</td>
            <td>{{item.certi_agency}}</td>
            <td>{{item.certi_time}}</td>
            <td>{{item.certi_doc}}</td>
          </tr>
        </table>
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
          title: "公司代码",
          key: "ts_code",
          width: 130,
          fixed: "left",
          sortable: true
        },
        {
          title: "开始时间",
          key: "ann_date",
          width: 130,
          sortable: true
        },
        {
          title: "结束时间",
          key: "end_date",
          width: 130,
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
          width: 150,
          sortable: true
        },
        {
          title: "审计费用",
          key: "audit_fees",
          width: 150,
          sortable: true
        },
        {
          title: "签字注师",
          key: "audit_sign",
          width: 200,
          render: (h, params) => {
                      let cpas = params.row.audit_sign && params.row.audit_sign.split(',')
                       cpas = cpas && cpas.reduce((acc,cpa,index) => {
                         acc.push(h('a',{ props:{ href:'#'}, on: { click:()=>{ this.cpa=cpa;this.showModal(); }}}, cpa))
                          if(index !== (cpas.length-1)) acc.push(h('span',null,'，'))
                          return acc
                      },[])
                      return h('div', cpas);
                  }
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
    ...mapActions(['get_audit_fees_records']),
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
      this.get_audit_fees_records({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size
      }).then(() => {})
    },
    showModal(){
      search_cpa({cpa:this.cpa}).then( res => {
        this.cpa_list = res.data        
        this.modalShow = true
      }) 
    }
  }
};
</script>
