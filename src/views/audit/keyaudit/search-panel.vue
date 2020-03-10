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
          <FormItem  label="期间">
            
               <Select v-model="keywords.annul" multiple :transfer="true" style="width:300px;">
            <Option v-for="(item,index) in annuls" :value="item" :key="index">{{ item }}</Option>
          </Select>
            
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
        <FormItem label="行业">
          <IndustryAutoComplete v-model="keywords.industry"></IndustryAutoComplete>
        </FormItem>
      </Col>
    </Row>
      <Row>
        <Col span="12">
          <FormItem label="描述">
              <Input style="width:200px" type="text" placeholder="匹配关键字" v-model="keywords.info"></Input>
          </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="应对">
                        <Input style="width:200px" type="text" placeholder="匹配关键字" v-model="keywords.reply"></Input>
      </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="标题">
              <Input style="width:200px" type="text" placeholder="匹配关键字" v-model="keywords.title"></Input>
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
import util from "@/libs/util";
import config from "@/config/config";
import CompanyAutoComplete from '@/views/components/company-auto-complete';
import AgencyAutoComplete from '@/views/components/agency-auto-complete';
import IndustryAutoComplete from '@/views/components/industry-auto-complete';
const { mapActions, mapMutations } = createNamespacedHelpers("audit");
export default {
  data() {
    return {
      keywords: {
        title: "",
        info: "",
        reply:"",
        company_code:"",
        agency:"",
        industry:'',
        annul:''
      },
      annuls:[
        '2017年度',
        '2018年度',
        '2019年度'
      ]
    };
  },
  mounted() {
    this.handleSubmit();
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_keyaudit"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let company_code = this.keywords.company_code || ''
      company_code = company_code.match(/\[(.*)\]/) && company_code.match(/\[(.*)\]/)[1]
      let keywords = { ...this.keywords ,company_code, current_page: 1, page_size: 10 };
      this.set_spin(true);
      this.get_keyaudit(keywords).then(() => this.set_spin(false));
    }
  },
  components:{
    AgencyAutoComplete,
    CompanyAutoComplete,
    IndustryAutoComplete
  }
};
</script>
