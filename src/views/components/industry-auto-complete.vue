<style lang="less" scoped></style>
<template>
  <AutoComplete
          transfer
          clearable
        :value="value"
        @input="$emit('input',$event)"
        :data="matched_industry"
        @on-search="handleSearchIndustry"
        placeholder="匹配关键字"
        style="width:300px"></AutoComplete>
</template>
<script>
import { search_industry } from "@/apis/auto_complete"

export default {
  name: "IndustryAutoComplete",
  props:['value'],
  data() {
    return {
      matched_industry: []
    };
  },
  methods: {
    handleSearchIndustry(value){
      search_industry(value).then(res => {
        this.matched_industry = res.data.map( item => {
          return `${item.industry}`
        })
      })
    }
   
  }
};
</script>
