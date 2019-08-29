<style scoped>
.search-panel {
  background: white;
  margin: 0 20px;
  padding: 20px;
}
</style>
<template>
  <div class="search-panel">
    <Form ref="formInline" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem prop="user">
            <Input type="text" v-model="keywords.company" placeholder="匹配关键字">
              <span slot="prepend">公司</span>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="时间">
            <DatePicker
              format="yyyy/MM/dd"
              type="daterange"
              placeholder="选择时间段"
              style="width: 200px"
              v-model="keywords.datespan"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="password">
            <Input type="text" placeholder="匹配关键字" v-model="keywords.title">
              <span slot="prepend">标题</span>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="chapter" label="章节">
            <Input type="text" placeholder="匹配关键字" v-model="keywords.chapter"></Input>
          </FormItem>
        </Col>
      </Row>

      <FormItem prop="content">
        <Input type="text" placeholder="匹配关键字" v-model="keywords.content">
          <span slot="prepend">正文</span>
        </Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit">搜索</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: {
        company: "",
        title: "",
        datespan: "",
        chapter: "",
        content: ""
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleSubmit() {
      this.$emit('on-submit',this.keywords)
    }
  }
};
</script>
