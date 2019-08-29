<style scoped>
    .info-panel {
  height: 500px;
  background: white;
  margin:20px;
  padding: 20px;
}
</style>
<template>
    <div class="info-panel">
          <Tabs value="name1">
            <TabPane label="发审会公告" name="name1">最新公告</TabPane>
            <TabPane label="证监会要闻" name="name2">证监会要闻</TabPane>
            <TabPane label="证监会新闻发布会" name="name3">证监会最新发布会</TabPane>
            <TabPane label="上交所要闻" name="name4">证监会最新发布会</TabPane>
            <TabPane label="上交所新闻发布会" name="name4">证监会最新发布会</TabPane>
            <TabPane label="深交所要闻" name="name5">证监会最新发布会</TabPane>
            <TabPane label="深交所新闻发布会" name="name6">证监会最新发布会</TabPane>
          </Tabs>
        </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted () {
         
        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
