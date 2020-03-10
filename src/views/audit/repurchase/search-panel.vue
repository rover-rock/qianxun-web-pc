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
        company_code:"",
      }
    };
  },
  mounted() {
    this.handleSubmit();
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_repurchase"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let company_code = this.keywords.company_code || ''
      company_code = company_code.match(/\[(.*)\]/) && company_code.match(/\[(.*)\]/)[1]
      let keywords = { ...this.keywords ,company_code, current_page: 1, page_size: 10 };
      this.set_spin(true);
      this.get_repurchase(keywords).then(() => this.set_spin(false));
    }
  },
  components:{
    CompanyAutoComplete,
    CustomDatePicker
  }
};
</script>
