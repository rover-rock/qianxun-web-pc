<style lang='less' scoped>
</style>
<template>
  <div class="search-panel">
    <Form ref="form" @keydown.enter.native="handleSubmit" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="公司">
            <CompanyAutoComplete
              v-model="keywords.company"
            ></CompanyAutoComplete>
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
          <FormItem prop="question" label="提问">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.question"></Input>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="comment" label="回复">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.comment"></Input>
            </Tooltip>
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
const { mapActions, mapMutations } = createNamespacedHelpers("audit");
export default {
  data() {
    return {
      keywords: {
        start: "1990-01-01 00:00:00",
        end: new Date().toLocaleDateString(),
        question: "",
        comment: "",
        company: ""
      },
      datespan: ["1990-01-01 00:00:00", new Date().toLocaleDateString()],
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
    this.handleSubmit();
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_wenda_records"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      
      //匹配数据库中时间格式
      let start = util.format(this.keywords.start) + " 00:00:00",
      //es中使用的时间格式要对
          end = util.format(this.keywords.end) + " 23:59:59",
          company = (this.keywords.company && this.keywords.company.split(' ')[1]) || '';
      let keywords = { ...this.keywords, current_page: 1, page_size: 10, sort:'latest',start,end,company };
      this.set_spin(true);
      this.get_wenda_records(keywords).then(() => this.set_spin(false));
      this.$store.dispatch("add_to_search_history", this.keywords);
    }
  },
  components:{
    CompanyAutoComplete
  }
};
</script>
