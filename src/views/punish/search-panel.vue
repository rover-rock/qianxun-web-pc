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
          format="yyyy-MM-dd"
          type="date"
          placement="top"
          placeholder="选择起始时间"
          style="width: 200px"
          v-model="keywords.start"
        ></DatePicker>
        <span>至</span>
        <DatePicker
          format="yyyy-MM-dd"
          type="date"
          placement="top"
          placeholder="选择结束时间"
          style="width: 200px"
          v-model="keywords.end"
          
        ></DatePicker>
        </div>
        
      </FormItem>
      <FormItem label="机关">
        <Input type="text"  placeholder="匹配关键字" v-model="keywords.agency">
        </Input>
      </FormItem>
      <FormItem label="标题">
        <Input type="text"  placeholder="匹配关键字" v-model="keywords.title">
        </Input>
      </FormItem>
      <FormItem label="内容">
        <Input type="text"  placeholder="匹配关键字" v-model="keywords.content">
        </Input>
      </FormItem>  
      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">检索</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { mapActions } from "vuex";
import util from "@/libs/util"

export default {
  data() {
    return {
      keywords: {
        start:'2015-07-19',
        end:'2019-07-18',
        agency:'',
        title:'',
        content:''
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    ...mapActions(['search_by_keywords']),
    handleSubmit(name) {
      this.keywords.start = util.format(this.keywords.start)
      this.keywords.end = util.format(this.keywords.end)
      this.search_by_keywords(this.keywords) 
    }
  }
};
</script>
