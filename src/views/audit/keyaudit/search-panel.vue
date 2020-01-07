<style lang='less' scoped>
</style>
<template>
  <div class="search-panel">
    <Form ref="form" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="公司">
           <CompanyAutoComplete v-model="keywords.company_code"></CompanyAutoComplete>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="期间">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%"  type="text" placeholder="匹配关键字" v-model="keywords.annul"></Input>
            </Tooltip>
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
          <Input style="width:200px" clearable type="text" placeholder="匹配关键字" v-model="keywords.thsindusty"></Input>
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
        thsindustry:''
      },
      datespan: ["1990-01-01", new Date().toLocaleDateString()],
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
      let company_code = this.keywords.company_code
      this.keywords.company_code = company_code.match(/\[(.*)\]/) && company_code.match(/\[(.*)\]/)[1]
      let keywords = { ...this.keywords , current_page: 1, page_size: 10 };
      this.set_spin(true);
      this.get_keyaudit(keywords).then(() => this.set_spin(false));
    }
  },
  components:{
    AgencyAutoComplete,
    CompanyAutoComplete
  }
};
</script>
