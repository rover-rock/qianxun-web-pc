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

import historyBlock from "@/views/components/history-block";
import { get_latest_replies,get_last_week_comments } from "@/apis/case_data";

export default {
  data() {
    return {
      latest_replies: [],
      hottest_questions: []
    };
  },
  methods: {
    
    async init_chart() {
      let x_data = []
      for (let i = 1; i <= 7; i++) {
        let time = new Date(Date.now() - 1000*60*60*24*i)
        x_data.unshift( time.toLocaleDateString() )
      }
      let res = await get_last_week_comments()
      let data = res.data.map(item => { return item[0].total })
      var myChart = echarts.init(document.getElementById("chart"));
      myChart.setOption({
        title: {
          text: "最近一周回复量",
          left: '100',
          textStyle:{
              fontSize:"14", 
          }
        },
        tooltip: {},
        xAxis: {
          data: x_data,
          axisLabel:{
            rotate:-45
          }
        },
        yAxis: {},
        series: [
          {
            name: "回复数",
            type: "bar",
            data: data
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