<style lang="less" scoped>
    

.panel1 {
  
}
.panel2{
    margin-top: 20px;
}
</style>
<template>
    <div>
        <div class="panel1">
          <Card :bordered="false">
            <p slot="title">搜索历史</p>
            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type.</p>
          </Card>
        </div>
        <div class="panel2">
          <Card :bordered="false">
            <p slot="title">统计数据</p>
            <Collapse simple>
              <Panel name="1">
                公告类型
                <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
              </Panel>
              <Panel name="2">
                行业统计
                <p
                  slot="content"
                >斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
              </Panel>
              <Panel name="3">
                市场统计
                <p
                  slot="content"
                >乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
              </Panel>
            </Collapse>
          </Card>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        
    }
}
</script>