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
            :type = "$route.params.type"
            ></CompanyAutoComplete>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="期间">
            <CustomDatePicker v-model="datespan" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="question" label="章节">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.chapter"></Input>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="comment" label="正文">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.content"></Input>
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="question" label="标题">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.title"></Input>
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
import { time_mixin } from "@/mixins"
import CompanyAutoComplete from '@/views/components/company-auto-complete'
import CustomDatePicker from '@/views/components/custom-date-picker'
const { mapActions, mapMutations } = createNamespacedHelpers("report");
export default {
  mixins:[time_mixin],
  data() {
    return {
      keywords: {
        title:"",
        chapter: "",
        content: "",
        company: ""
      }
    };
  },
  watch: {
    "$route.params.type"(){
      this.handleSubmit()
    }
  },
  mounted() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions(["search"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {     
        let  company = (this.keywords.company && this.keywords.company.match(/\[([0-9]{6}).*\]/)[1]) || '';
      let keywords = { ...this.keywords, type:this.$route.params.type, current_page: 1, page_size: 10, sort:'latest',company };
      this.set_spin(true);
      this.search(keywords).then(() => this.set_spin(false));
      this.$store.dispatch("add_to_search_history", this.keywords);
    }
  },
  components:{CompanyAutoComplete,CustomDatePicker}
};
</script>
