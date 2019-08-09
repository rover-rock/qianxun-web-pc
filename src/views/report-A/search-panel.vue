<style scoped>
</style>
<template>
    <search-panel @on-submit="handleSumbit"></search-panel>
</template>
<script>
import searchPanel from "@/views/shared-components/search-panel";

    export default {
        data () {
            return {}
        },
        mounted () {
        },
        beforeDestroy () {

        },
        methods: {
            handleSumbit(keywords){
                console.log(keywords)
            }
        },
        components:{
            searchPanel
        }
    }
</script>
