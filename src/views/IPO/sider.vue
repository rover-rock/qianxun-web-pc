<style lang="less" scoped>
.panel1 {
  .history-block {
    display: flex;
    flex-wrap: wrap;
    .ivu-card {
      margin: 3px 10px;
    }
  }
}
.panel2 {
  margin-top: 20px;
  background: white;
}
#chart{
    height:300px;
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
          <div>
            <span>回复人：{{item.comment_author}}</span>
            <span>{{item.comment_time}}</span>
          </div>
          <Divider></Divider>
          <div>
            <a target="_blank" :href="item.url">问题：{{item.question_text}}</a>
          </div>
          <Divider></Divider>
          <div>
            <span>答复：</span>
            {{item.comment_text}}
          </div>
        </div>
      </Card>
    </div>
    <div class="panel2">
      <div id="chart"></div>
    </div>
  </div>
</template>
<script>
import { get_latest_replies } from "@/apis/case_data";
import historyBlock from '@/views/shared-components/history-block';

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