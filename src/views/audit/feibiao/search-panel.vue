<style lang='less' scoped>
</style>
<template>
  <div class="search-panel">
    <Form ref="form" @keydown.enter.native="handleSubmit" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="公司">
           <CompanyAutoComplete v-model="keywords.company_code"></CompanyAutoComplete>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="时间">
               <CustomDatePicker             
              v-model="datespan"
            ></CustomDatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
      <Col span="12">
        <FormItem label="事务所">
          <AgencyAutoComplete v-model="keywords.agency"></AgencyAutoComplete>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="审计意见">
          <Select v-model="keywords.audit_result" :transfer="true" style="width:300px;">
            <Option v-for="(item,index) in audit_result_types" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
      <Row>
        <Col span="12">
          <FormItem label="非标意见正文">
              <Input style="width:400px" type="text" placeholder="匹配关键字" v-model="keywords.content"></Input>
          </FormItem>
        </Col>
      </Row>

      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">检索</Button>
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

const { mapActions, mapMutations } = createNamespacedHelpers("audit");
export default {
  mixins:[time_mixin],
  data() {
    return {
      keywords: {
        content:'',
        company_code:"",
        agency:"",
        audit_result:''
      },
      audit_result_types:[
        '保留意见',
        '带强调事项段的无保留意见', 
        '无法表示意见'
      ]
    };
  },
  mounted() {
    this.handleSubmit();
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_feibiao"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let company_code = this.keywords.company_code || ''
      company_code = company_code.match(/\[(.*)\]/) && company_code.match(/\[(.*)\]/)[1]
      let keywords = { ...this.keywords ,company_code, current_page: 1, page_size: 10 };
      this.set_spin(true);
      this.get_feibiao(keywords).then(() => this.set_spin(false));
    }
  },
  components:{
    AgencyAutoComplete,
    CompanyAutoComplete,
    CustomDatePicker
  }
};
</script>
