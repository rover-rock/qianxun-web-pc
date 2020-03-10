<style scoped lang="less">
.tool-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
}
.tool {
  width: 300px;
  height: 80px;
  margin-top: 20px;
  margin-left: 15px;
}
</style>
<template>
  <div class="tool-container">
    <tool-block v-for="(item, index) in tools" :key="index" class="tool" :name="item.name" :to="item.to" :type="item.type" like_num="800"></tool-block>
  </div>
</template>
<script>
import toolBlock from "./tool-block"

export default {
  data() {
    return {
        tools:[
            {
                name:'快递查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'往来函证地址验证',
                to:'/audit/tools/hanzheng',
                type:"ios-archive"
            },
            {
                name:'快递全地址查询',
                to:'/audit/tools/package',
                type:"ios-hammer"
            },
            {
                name:'顺丰查询',
                to:'/audit/tools/package',
                type:"ios-book"
            },
            {
                name:'上市公司公告披露日期查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'报告复核采集器',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            
            {
                name:'报告复核采集器',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'门店地址核对器',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'身份证查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'历史汇率查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'海关查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'贵金属价格查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'发票真伪查询',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
            {
                name:'一键神器',
                to:'/audit/tools/package',
                type:"ios-archive"
            },
        ]
    };
  },
  components:{
      toolBlock
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
