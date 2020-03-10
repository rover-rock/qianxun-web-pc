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
        <FormItem label="期间">
          <CustomDatePicker 
            v-model="datespan"
          ></CustomDatePicker>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="签字注师">
          <Input clearable type="text" placeholder="匹配关键字" v-model="keywords.cpa"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <FormItem label="公司">
          <CompanyAutoComplete
        v-model="keywords.company"
        ></CompanyAutoComplete>
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
    <Row>
      <Col span="12">
        <FormItem label="审计意见类型">
          <Select v-model="keywords.audit_result" multiple :transfer="true" style="width:500px;">
            <Option v-for="(item,index) in result_types" :value="item" :key="index">{{ item }}</Option>
          </Select>
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
import { time_mixin } from "@/mixins"
import CompanyAutoComplete from '@/views/components/company-auto-complete';
import AgencyAutoComplete from '@/views/components/agency-auto-complete';
import CustomDatePicker from '@/views/components/custom-date-picker';
const { mapActions } = createNamespacedHelpers('audit')

export default {
  mixins:[time_mixin],
  data() {
    return {
      keywords: {
        company: "",
        audit_result: [],
        agency: "",
        cpa: ""
      },
      result_types: [
        "标准无保留意见",
        "带强调事项段的无保留意见",
        "保留意见",
        "无法表示意见"
      ]
    };
  },
  mounted() {
    this.submit()
  },
  methods: {
    ...mapActions(["get_audit_fees_records"]),
    submit() {   
      let company = /\[(.+)\]/g.exec(this.keywords.company) ,
          agency = (this.keywords.agency && this.keywords.agency.split(' ')[1]) || '';
      company = company ? company[1] : '';
      if( agency && agency !== '' ) agency = agency.split('（')[0];
      let keywords = { ...this.keywords , company, agency, current_page: 1, page_size: 10  }
      this.get_audit_fees_records( keywords );
    }
  },
  components:{
    CompanyAutoComplete,
    AgencyAutoComplete,
    CustomDatePicker
  }
};
</script>
