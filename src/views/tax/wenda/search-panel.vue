<style lang='less' scoped>
.search-panel {
  background: white;
  padding: 20px;
  margin: 0 20px;
}
</style>
<template>
  <Card class="search-panel">
    <Form ref="form" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="问题">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.question"></Input>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="回复">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%"  type="text" placeholder="匹配关键字" v-model="keywords.reply"></Input>
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="税种">
              <Input type="text" style="width:200px" placeholder="匹配关键字" v-model="keywords.category"></Input>
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
      

      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">检索</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import util from "@/libs/util";
import config from "@/config/config";

const { mapActions, mapMutations } = createNamespacedHelpers("tax");
export default {
  data() {
    return {
      keywords: {
        start: "1990-01-01",
        end: new Date().toLocaleDateString(),
        question: "",
        reply: "",
        category:""
      },
      datespan: ["1990-01-01", new Date().toLocaleDateString()],
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
    ...mapActions(["get_wenda", "get_wenda_total"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let keywords = { ...this.keywords, current_page: 1, page_size: 10 };
      //匹配数据库中时间格式 
      keywords.start = util.format(keywords.start);
      keywords.end = util.format(keywords.end);

      this.set_spin(true);
      this.get_wenda(keywords).then(() => this.set_spin(false));
      this.get_wenda_total(keywords);
    }
  }
};
</script>
