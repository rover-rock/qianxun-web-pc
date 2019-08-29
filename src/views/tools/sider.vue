<style scoped>
    
</style>
<template>
    <Card dis-hover style="margin-top:40px">
        <p slot="title">我的常用工具</p>
        <Tag type="dot" checkable closable color="success" v-if="show" @on-close="close" @on-change="goto">快递查询 </Tag>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                show:true
            }
        },
        mounted () {
        },
        beforeDestroy () {

        },
        methods: {
            goto(){
                this.$router.push('/audit/tools/package')
            },
            close(){
                this.show = false;
            }
        }
    }
</script>
