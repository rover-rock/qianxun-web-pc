<style lang="less" scoped>
.panel2 {
  margin-top: 20px;
  background: white;
}
#chart{
    height:300px;
}
.sider-time{
          display: flex;
    justify-content: flex-end;
    margin-top: 15px;
      font-weight: bolder;
}
</style>
<template>
  <div>
    <div class="panel1">
      <history-block></history-block>
    </div>
    <div class="panel2">
      <Card :bordered="false">
        <p slot="title">热点问题</p>
        <p v-if="!hottest_questions.length">暂无</p>
      </Card>
    </div>
    <div class="panel2">
      <Card :bordered="true">
        <p slot="title">最新回复</p>
        <p v-if="latest_replies.length === 0">暂无</p>
        <div v-for="(item, index) in latest_replies" :key="index">
          
          <h4>{{ item.title }}</h4>
          <div>
            <Tag color="primary">问题</Tag> ：<a target="_blank" :href="item.url" v-html="item.question_text"></a>
          </div>
          
          <div>
            <Tag color="success"> {{item.author}}</Tag>：<span v-html="item.comment_text"></span>
          </div>
          <div class="sider-time">
            <span>{{item.comment_time}}</span>
          </div>
          <Divider></Divider>
        </div>
      </Card>
    </div>
    <div class="panel2">
      <div id="chart"></div>
    </div>
  </div>
</template>
<script>

import historyBlock from "@/views/shared-components/history-block";
import { get_latest_replies } from "@/apis/case_data";

export default {
  data() {
    return {
      latest_replies: [],
      hottest_questions: []
    };
  },
  methods: {
    
    init_chart() {
      var myChart = echarts.init(document.getElementById("chart"));
      myChart.setOption({
        title: {
          text: "统计数据",
          left: '100',
          textStyle:{
              fontSize:"14", 
          }
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },
  mounted() {
    get_latest_replies().then(res => {
      this.latest_replies = res.data;
    });
    this.init_chart();
  },
  components:{
    historyBlock
  }
};
</script>