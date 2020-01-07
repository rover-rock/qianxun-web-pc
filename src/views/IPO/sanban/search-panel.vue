<style scoped>
.split-text {
  margin: 0 5px;
}
</style>
<template>
<div class="search-panel">
  <Form ref="form" :label-width="150" :model="keywords">
    <Row>
      <Col span="12">
        <FormItem label="关键词">
          <Input clearable type="text" placeholder="查询事务所，律所，公司，保荐人及备注等信息" v-model="keywords.keyword"></Input>
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
      <Button type="primary" @click="submit()">检索</Button>
    </FormItem>
  </Form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import util from "@/libs/util";
import config from "@/config/config";

const { mapActions } = createNamespacedHelpers('IPO')
export default {
  data() {
    return {
      keywords: {
        start: new Date("2000-01-01").toLocaleDateString(),
        end: new Date().toLocaleDateString(),
        keyword:''
      },
      market_types: [
        "主板",
        "中小板",
        "创业板"
      ],
      status_types: [
        '已通过发审会',
        '预先披露更新',
        '已反馈',
        '已上发审会，暂缓表决',
        '已受理'
      ],
      datespan: ["2000-01-01 00:00:00", new Date().toLocaleDateString()],
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
    this.submit()
  },
  methods: {
    ...mapActions(["get_sanban"]),
    submit() {         
      let keywords = this.compose_keywords()
      this.get_sanban( keywords )
    },
    compose_keywords(){
      let start = util.format(this.keywords.start),
          end = util.format(this.keywords.end)
      return { ...this.keywords , start, end, current_page: 1, page_size: 10  }
    }
  }
};
</script>
