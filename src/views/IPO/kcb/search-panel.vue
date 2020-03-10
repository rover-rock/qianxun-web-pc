<style scoped>
.split-text {
  margin: 0 5px;
}
</style>
<template>
<div class="search-panel">
  <Form ref="form" @keydown.enter.native="submit" :label-width="150" :model="keywords">
    <Row>
      <Col span="12">
        <FormItem label="关键词">
          <Input clearable type="text" placeholder="查询" v-model="keywords.keyword"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="期间">
          <DatePicker
            format="yyyy-MM-dd"
            type="daterange"
            placement="top"
            placeholder="选择期间"
            style="width: 200px"
            :transfer="true"
            v-model="datespan"
            :options="options"
          ></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="签字注师">
          <Input clearable type="text" placeholder="匹配关键字" v-model="keywords.cpa"></Input>
        </FormItem>
      </Col>
      <Col span="12">
      <FormItem label="会计师事务所">
          <AgencyAutoComplete
        v-model="keywords.agency"
       ></AgencyAutoComplete>
        </FormItem>
      </Col>
    </Row>
    <FormItem>
      <Button type="primary" @click="submit()">检索</Button>
    </FormItem>
  </Form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import util from "@/libs/util";
import config from "@/config/config";
import { search_agency } from "@/apis/auto_complete"
import AgencyAutoComplete from '@/views/components/agency-auto-complete';
const { mapActions } = createNamespacedHelpers('IPO')
export default {
  data() {
    return {
      keywords: {
        start: new Date("2000-01-01").toLocaleDateString(),
        end: new Date().toLocaleDateString(),
        keyword:''
      },
      datespan: ["2000-01-01 00:00:00", new Date().toLocaleDateString()],
      options: config.options
    };
  },
  watch: {
    datespan(value) {
      this.keywords.start = this.datespan[0];
      this.keywords.end = this.datespan[1];
    }
  },
  mounted() {
    this.submit()
  },
  methods: {
    ...mapActions(["get_kcb"]),
    submit() {   
      let keywords = this.compose_keywords()
      this.get_kcb( keywords )
    },
    compose_keywords(){
      let start = util.format(this.keywords.start),
          end = util.format(this.keywords.end)
      return { ...this.keywords , keyword:this.keyword, start, end, current_page: 1, page_size: 10  }
    }
  },
  components:{
    AgencyAutoComplete
  }
};
</script>
