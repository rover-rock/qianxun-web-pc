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
            <TabPane label="标签一" name="name1">最新公告</TabPane>
            <TabPane label="标签二" name="name2">证监会要闻</TabPane>
            <TabPane label="标签三" name="name3">证监会最新发布会</TabPane>
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
