<style lang='less' scoped>
.search-panel {
  background: white;
  margin: 0 20px;
  padding: 20px;
}
.row{
    display: flex;
    span{
        margin:0 10px;
    }
}
</style>
<template>
  <Card class="search-panel">
    <Form ref="form" :label-width="80" :model="keywords" >
        <FormItem label="期间">
        <div class="row">
            <DatePicker
          format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placement="top"
          placeholder="选择起始时间"
          style="width: 200px"
          v-model="keywords.start"
        ></DatePicker>
        <span>至</span>
        <DatePicker
          format="yyyy-MM-dd hh:MM:ss"
          type="datetime"
          placement="top"
          placeholder="选择结束时间"
          style="width: 200px"
          v-model="keywords.end"
          
        ></DatePicker>
        </div>
        
      </FormItem>
      <FormItem prop="question" label="问题">
        <Input type="text"  placeholder="匹配关键字" v-model="keywords.question">
        </Input>
      </FormItem>
      <FormItem prop="comment" label="回复">
        <Input type="text"  placeholder="匹配关键字" v-model="keywords.comment">
        </Input>
      </FormItem>  
      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">检索</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      keywords: {
        start:'2015-07-19 00:00:00',
        end:'2019-07-18 12:07:00',
        question:'',
        comment:''
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    ...mapActions([
      'search',
      'add_to_search_history'
      ]),
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.search(this.keywords)
          this.add_to_search_history(this.keywords)
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
