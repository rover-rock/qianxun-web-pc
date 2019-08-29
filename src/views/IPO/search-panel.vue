<style scoped>
</style>
<template>
    <search-panel @on-submit="handleSubmit"></search-panel>
</template>
<script>
import searchPanel from "@/views/components/search-panel";
import util from "@/libs/util"

    export default {
        data () {
            return {}
        },
        mounted () {
        },
        beforeDestroy () {

        },
        methods: {
            handleSubmit(keywords){
                console.log(keywords)
                keywords['cat'] = this.$route.params.cat
                keywords['type'] = 'yupilu'
                let datespan = keywords.datespan
                keywords['start'] = util.format(datespan[0])
                keywords['end'] = util.format(datespan[1])
                // delete keywords.datespan
                this.$store.dispatch('get_IPO_queue_data',keywords)
            }
        },
        components:{
            searchPanel
        }
    }
</script>
