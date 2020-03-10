<style lang='less' scoped>
</style>
<template>
  <div class="search-panel">
    <Form ref="form" @keydown.enter.native="handleSubmit" :label-width="80" :model="keywords">
      <Row>
        <Col span="12">
          <FormItem label="种类">
          <Select v-model="keywords.type" :transfer="true" style="width:300px;">
            <Option v-for="(item,index) in types" :value="item" :key="index">{{ item }}</Option>
          </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="日期">
            <CustomDatePicker v-model="datespan" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="question" label="标题">
              <Input style="width:60%" type="text" placeholder="匹配关键字" v-model="keywords.title"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="comment" label="正文">
              <Input style="width:60%" type="text" placeholder="匹配关键字" v-model="keywords.content"></Input>
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
import CustomDatePicker from '@/views/components/custom-date-picker'
const { mapActions, mapMutations } = createNamespacedHelpers("tax");
export default {
    mixins:[time_mixin],
  data() {
    return {
      keywords: {
        title:"",
        type: "",
        content: ""
      },
      types:[
        '财政部政策',
        '北注协专家提示',
        '其他政策',
        '会计法',
        '会计制度',
        '企业会计准则',
        '企业会计准则解释',
        '实务问答'
      ]
    };
  },
  mounted() {
    this.handleSubmit();
  },
  methods: {
    ...mapActions(["get_zhunze"]),
    ...mapMutations(["set_spin"]),
    handleSubmit() {
      
      //匹配数据库中时间格式
      let company = (this.keywords.company && this.keywords.company.match(/\[([0-9]{6}).*\]/)[1]) || '';
      let keywords = { ...this.keywords , current_page: 1, page_size: 10, sort:'latest'};
      this.set_spin(true);
      this.get_zhunze(keywords).then(() => this.set_spin(false));
    }
  },
  components:{CustomDatePicker}
};
</script>
