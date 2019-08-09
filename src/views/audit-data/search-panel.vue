<style scoped lang="less">
    .container {
  background: white;
  margin: 0 20px;
  padding: 20px;
    }
</style>
<template>
    <div class="container">
          <Tabs value="name1" @on-click="change_tab">
            <TabPane label="关键审计事项查询" name="name1">关键审计事项查询</TabPane>
            <TabPane label="非标意见具体内容查询" name="name2Result">
                <name2-component></name2-component>
            </TabPane>
            <TabPane label="审计意见类型、会计事务所、审计收费、签字注师查询" name="name3Result">
                <name3-component></name3-component>
            </TabPane>
            <TabPane label="券商研报关键词查询" name="name4">券商研报关键词查询</TabPane>
            <TabPane label="投资者关注问题查询" name="name5">投资者关注问题查询</TabPane>
            <TabPane label="关联方核查功能" name="name6">关联方核查功能</TabPane>
            <TabPane label="研发资本化比例查询" name="name7">研发资本化比例查询</TabPane>
          </Tabs>
    </div>
</template>
<script>
    import name3Component from "./name3-tab";
    import name2Component from "./name2-tab"
    export default {
        data () {
            return {}
        },
        mounted () {
            
        },
        beforeDestroy () {

        },
        methods: {
            change_tab( name ){
                this.$store.commit('set_active_component',name)
            }
        },
        components:{
            name2Component,
            name3Component
        }
    }
</script>
