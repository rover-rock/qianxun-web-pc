<style lang="less" scoped></style>
<template>
  <AutoComplete
    transfer
    clearable
    :value = 'value'
    :type = 'type'
    @input="$emit('input', $event)"
    :data="matched_company"
    @on-search="handleSearchCompany"
    placeholder="匹配关键字"
    style="width:300px"
  ></AutoComplete>
</template>
<script>
import { search_company } from "@/apis/auto_complete";

export default {
  name: "CompanyAutoComplete",
  props:['value','type'],
  data() {
    return {
      matched_company: []
    };
  },
  methods: {
    handleSearchCompany(value) {
      search_company(value,this.type).then(res => {
          if(!res) return
        this.matched_company = res.data.map(item => {
          return `[${item.ts_code}] ${item.name}`;
        });
      });
    }
   
  }
};
</script>
