<style lang='less' scoped>
</style> 
<template>
  <div class="search-panel">
    <Form ref="form"  @keydown.enter.native="handleSubmit" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="期间">
            <CustomDatePicker v-model="datespan"></CustomDatePicker>
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
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import {time_mixin} from "@/mixins";
import config from "@/config/config";
import CustomDatePicker from '@/views/components/custom-date-picker';
const { mapActions, mapMutations } = createNamespacedHelpers("punish");

export default {
  mixins:[time_mixin],
  data() {
    return {
      keywords: {
        agency: "",
        title: "",
        content: ""
      }
    };
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
      this.set_spin(true);
      this.search(keywords).then(() => this.set_spin(false));
      this.get_total(keywords);
      this.$store.dispatch("add_to_search_history", this.keywords);
    }
  },
  components:{
    CustomDatePicker
  }
};
</script>
