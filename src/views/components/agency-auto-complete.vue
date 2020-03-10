<style lang="less" scoped></style>
<template>
  <AutoComplete
          transfer
          clearable
        :value="value"
        @input="$emit('input',$event)"
        :data="matched_agency"
        @on-search="handleSearchAgency"
        placeholder="匹配关键字"
        style="width:300px"></AutoComplete>
</template>
<script>
import { search_agency } from "@/apis/auto_complete"

export default {
  name: "AgencyAutoComplete",
  props:['value'],
  data() {
    return {
      matched_agency: []
    };
  },
  methods: {
    handleSearchAgency(value){
      search_agency(value).then(res => {
        this.matched_agency = res.data.map( item => {
          return `${item.agency}`
        })
      })
    }
   
  }
};
</script>
