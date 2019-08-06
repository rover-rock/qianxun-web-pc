<style scoped>
.search-panel {
  height: 300px;
  background: white;
  margin: 0 20px;
  padding: 20px;
}
</style>
<template>
  <div class="search-panel">
    <Form ref="formInline" :label-width="80" :model="keywords" inline>
      <FormItem prop="user">
        <Input type="text" v-model="keywords.company" placeholder="匹配关键字">
          <span slot="prepend">公司</span>
          <span slot="append">自选</span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="text"  placeholder="匹配关键字">
          <span slot="prepend">标题</span>
        </Input>
      </FormItem>
      <FormItem prop="chapter">
        <Input type="text"  placeholder="匹配关键字">
          <span slot="prepend">章节</span>
        </Input>
      </FormItem>
      <FormItem prop="content">
        <Input type="text"  placeholder="匹配关键字">
          <span slot="prepend">正文</span>
        </Input>
      </FormItem>
      <FormItem label="时间">
        <DatePicker
          format="yyyy/MM/dd"
          type="daterange"
          placeholder="选择时间段"
          style="width: 200px"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
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
        datespan:"",
        chapter:"",
        content:""
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
