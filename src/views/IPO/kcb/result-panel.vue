<style scoped>
.modal-table {
  border-collapse: collapse;
  width: 100%;
}
.modal-table,
tr,
td {
  border: 1px solid black;
  text-align: center;
}
</style>
<template>
  <div class="result-panel">
    <Table
      :columns="columns"
      :data="data_lines"
      size="small"
      ref="table"
      stripe
    ></Table>
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
import { createNamespacedHelpers } from "vuex";
import { pager_mixin } from "@/mixins";

const { mapActions, mapMutations, mapState } = createNamespacedHelpers("IPO");
let vm;
const create_filters = (labels_arr) => {
  return labels_arr.map( labels => labels.map( (label,index ) => ({ label, value:index}) ))
}

const filters = create_filters([[
        "主板",
        "中小板",
        "创业板"
      ]
  ,[
        '已通过发审会',
        '预先披露更新',
        '已反馈',
        '已上发审会，暂缓表决',
        '已受理'
      ]])
let create_filterRemote_method = (key,index) => {
  return function ( value ) {
    const match =  filters[index].find( ele => ele.value === value[0])
              let keywords = {
              ...vm.keywords,
              current_page: 1,
              page_size: vm.page_size
            }
            keywords[key] = match && match.label,
            vm.get_kcb(keywords).then(() => {});
  }
}
export default {
  mixins: [pager_mixin],
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
          width: 150,
          sortable: true
        },
        {
          title: "上市板块",
          key: "market",
          width: 140,
          filters: filters[0],
          filterMultiple: false,
          filterRemote:create_filterRemote_method('market',0)
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
          filters: filters[1],
          filterMultiple: false,
          filterRemote:create_filterRemote_method('status',1)
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
          width: 200
        }
      ],
      page_size: 10,
      current_page: 1,
      modalShow: false
    };
  },
  computed: {
    ...mapState({
      total: state => state.total,
      data_lines: state => state.search_results,
      keywords: state => state.keywords
    })
  },
  mounted() {
    vm = this;
  },
  methods: {
    ...mapActions(["get_kcb"]),
    search_with_params() {
      this.get_kcb({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size
      }).then(() => {});
    }
  }
};
</script>
