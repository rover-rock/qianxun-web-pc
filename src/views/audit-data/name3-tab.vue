<style scoped>
.split-text {
  margin: 0 5px;
}
</style>
<template>
  <Form ref="form" :label-width="150" :model="keywords">
    <Row>
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
      <Col span="12">
        <FormItem label="审计意见类型">
          <Select v-model="keywords.audit_result" style="width:200px;">
            <Option v-for="(item,index) in result_types" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="公司">
          <AutoComplete
          transfer
        v-model="keywords.company"
        :data="matched_company"
        @on-search="handleSearchCompany"
        placeholder="匹配关键字"
        style="width:300px"></AutoComplete>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="会计师事务所">
          <AutoComplete
          transfer
        v-model="keywords.audit_agency"
        :data="matched_agency"
        @on-search="handleSearchAgency"
        placeholder="匹配关键字"
        style="width:300px"></AutoComplete>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="签字注师">
          <Input type="text" placeholder="匹配关键字" v-model="keywords.audit_sign"></Input>
        </FormItem>
      </Col>
    </Row>

    <FormItem>
      <Button type="primary" @click="submit()">检索</Button>
    </FormItem>
  </Form>
</template>
<script>
import { mapActions } from "vuex";
import util from "@/libs/util";
import config from "@/config/config";
import { search_company,search_agency } from "@/apis/auto_complete"
export default {
  data() {
    return {
      keywords: {
        start: new Date("2000-01-01").toLocaleDateString(),
        end: new Date().toLocaleDateString(),
        company: "",
        audit_result: "",
        audit_agency: "",
        audit_sign: ""
      },
      result_types: [
        "标准无保留意见",
        "带强调事项段的无保留意见",
        "保留意见",
        "无法表示意见"
      ],
      datespan: ["1990-01-01 00:00:00", new Date().toLocaleDateString()],
      options: config.options,
      matched_company: [],
      matched_agency: []
    };
  },
  watch: {
    datespan(value) {
      this.keywords.start = this.datespan[0];
      this.keywords.end = this.datespan[1];
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_audit_fees_records"]),
    submit() {
      this.keywords.start = util.format(this.keywords.start);
      this.keywords.end = util.format(this.keywords.end);
      this.keywords.company = this.keywords.company.split(' ')[1] || ''
      this.keywords.agency = this.keywords.agency.split(' ')[1] || ''
      this.get_audit_fees_records(this.keywords);
    },
    handleSearchCompany(value){
      search_company(value).then(res => {
        this.matched_company = res.data.map( item =>{
          return `[${item.ts_code}] ${item.name}`
        })
      })
    },
    handleSearchAgency(value){
      search_agency(value).then(res => {
        this.matched_agency = res.data.map( item => {
          return `[${item.agency_code}] ${item.agency_name}`
        })
      })
    }
  }
};
</script>
