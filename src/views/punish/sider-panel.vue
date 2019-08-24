<style lang="less" scoped>
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
        <p >暂无</p>
        
      </Card>
    </div>
    <div class="panel2">
      <div id="chart"></div>
    </div>
  </div>
</template>
<script>


import historyBlock from '@/views/shared-components/history-block';
console.log(echarts);
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
    
    this.init_chart();
  },
  components:{
    historyBlock
  }
};
</script>