<style lang='less' scoped>
</style>
<template>
  <Card class="search-panel">
    <Form ref="form" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="标题">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%" type="text" placeholder="匹配关键字" v-model="keywords.title"></Input>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="正文">
            <Tooltip content="多个关键字以空格隔开" placement="top" :transfer="true">
              <Input style="width:120%"  type="text" placeholder="匹配关键字" v-model="keywords.content"></Input>
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
      <Row>
      <Col span="12">
        <FormItem label="发文单位">
          <Input style="width:200px" clearable type="text" placeholder="匹配关键字" v-model="keywords.agency"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="文号">
          <Input style="width:200px" clearable type="text" placeholder="匹配关键字" v-model="keywords.doc"></Input>
        </FormItem>
      </Col>
    </Row>
      <Row>
        <Col span="12">
          <FormItem label="税种">
              <Input style="width:200px" type="text" placeholder="匹配关键字" v-model="keywords.category"></Input>
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
        title: "",
        content: "",
        agency:"",
        doc:"",
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
    ...mapActions(["get_laws", "get_laws_total"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      let keywords = { ...this.keywords, current_page: 1, page_size: 10 };
      //匹配数据库中时间格式 
      keywords.start = util.format(keywords.start);
      keywords.end = util.format(keywords.end);

      this.set_spin(true);
      this.get_laws(keywords).then(() => this.set_spin(false));
      this.get_laws_total(keywords);
    }
  }
};
</script>
