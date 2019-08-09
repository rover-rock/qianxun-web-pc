<style scoped>
.split-text {
  margin: 0 5px;
}
</style>
<template>
  <Form ref="form" :label-width="150" :model="keywords">
    <Row>
      <Col span="8">
      <FormItem label="会计师事务所">
      <Input type="text" placeholder="匹配关键字" v-model="keywords.audit_agency"></Input>
    </FormItem>
        
      </Col>
      <Col span="16">
        <FormItem label="时间">
          <div class="row">
            <DatePicker
              format="yyyy-MM-dd"
              type="date"
              placement="top"
              placeholder="选择起始时间"
              style="width: 200px"
              v-model="keywords.start"
            ></DatePicker>
            <span class="split-text">至</span>
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
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <FormItem label="非标意见类型">
      <Select v-model="keywords.audit_result" style="width:200px;">
        <Option v-for="(item,index) in result_types" :value="item" :key="index">{{ item }}</Option>
      </Select>
    </FormItem>
      </Col>
      <Col span="16">
      <FormItem label="公司">
          <Input type="text" placeholder="匹配关键字" v-model="keywords.company"></Input>
        </FormItem>
      </Col>
    </Row>
    

    
    <FormItem label="非标意见正文">
      <Input type="text" placeholder="匹配关键字" v-model="keywords.audit_sign"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="submit()">检索</Button>
    </FormItem>
  </Form>
</template>
<script>
import { mapActions } from "vuex";
import util from "@/libs/util";
export default {
  data() {
    return {
      keywords: {
        start: new Date("2000-01-01").toLocaleDateString(),
        end: new Date().toLocaleDateString(),
        company: "",
        audit_result: "",
        audit_agency: "",
        audit_sign: ""
      },
      result_types: [
        "标准无保留意见",
        "带强调事项段的无保留意见",
        "保留意见",
        "无法表示意见"
      ]
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    ...mapActions(["get_audit_fees_records"]),
    submit() {
      this.keywords.start = util.format(this.keywords.start);
      this.keywords.end = util.format(this.keywords.end);
      this.get_audit_fees_records(this.keywords);
    }
  }
};
</script>
