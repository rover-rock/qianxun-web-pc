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
        <Col span="12">
          <FormItem label="业绩预告类型">
              <Input style="width:300px" type="text" placeholder="匹配关键字" v-model="keywords.type"></Input>
          </FormItem>
        </Col>
      </Col>
      <Col span="12">
        <Col span="12">
          <FormItem label="行业">
              <Input style="width:300px" type="text" placeholder="匹配关键字" v-model="keywords.industry_sw"></Input>
          </FormItem>
        </Col>
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
import CustomDatePicker from '@/views/components/custom-date-picker';

const { mapActions, mapMutations } = createNamespacedHelpers("audit");
export default {
  mixins:[time_mixin],
  data() {
    return {
      keywords: {
        type:'',
        industry_sw:'',
        company_code:"",
      }
    };
  },
  mounted() {
    this.handleSubmit();
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_forecast"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let company_code = this.keywords.company_code || ''
      company_code = company_code.match(/\[(.*)\]/) && company_code.match(/\[(.*)\]/)[1]
      let keywords = { ...this.keywords ,company_code, current_page: 1, page_size: 10 };
      this.set_spin(true);
      this.get_forecast(keywords).then(() => this.set_spin(false));
    }
  },
  components:{
    CompanyAutoComplete,
    CustomDatePicker
  }
};
</script>
