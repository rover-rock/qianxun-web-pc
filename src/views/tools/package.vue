<style scoped>
    .container{
        width: 1000px;
        height: 100px;
            display: flex;
    justify-content: center;
    }
    .back-button{
        margin: 10px;
        font-size: 18px;
    }
</style>
<template>
    <div>
        <router-link tag="a" to="/">
            <div class="back-button">
                <Icon type="md-arrow-back" size="20" /> 返回
            </div>
        </router-link>
        
        <Card class="container">
            <Input style="width:500px" search enter-button placeholder="输入单号" />
        </Card>
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
