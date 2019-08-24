<style lang='less' scoped>
.search-panel {
  background: white;
  margin: 0 20px;
  padding: 0 20px;
}
</style>
<template>
  <Card class="search-panel">
    <Form ref="form" :label-width="80" :model="keywords">
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
          <FormItem label="机关">
            <Input type="text" placeholder="匹配关键字" v-model="keywords.agency"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="标题">
            <Input type="text" placeholder="匹配关键字" v-model="keywords.title"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="内容">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true" style="width:100%;">
            <Input type="text" placeholder="匹配关键字" v-model="keywords.content"></Input>
            </Tooltip>
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

const { mapActions, mapMutations } = createNamespacedHelpers("punish");

export default {
  data() {
    return {
      keywords: {
        start: "2015-07-19",
        end: "2019-07-18",
        agency: "",
        title: "",
        content: ""
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
    this.handleSubmit()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["search", "get_total"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let keywords = { ...this.keywords, current_page: 1, page_size: 10 };

      this.keywords.start = util.format(this.keywords.start);
      this.keywords.end = util.format(this.keywords.end);

      this.set_spin(true);
      this.search(keywords).then(() => this.set_spin(false));
      this.get_total(keywords);
      this.$store.dispatch("add_to_search_history", this.keywords);
    }
  }
};
</script>
