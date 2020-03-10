<style lang="less" scoped></style>
<template>
  <DatePicker
              format="yyyy-MM-dd" 
              type="daterange"
              placement="top"
              placeholder="选择期间"
              style="width: 200px"
              :transfer="true"
              :value="value"
              @input="handleInput"
              :options="options"
            ></DatePicker>
</template>
<script>
import config from "@/config/config";
import util from "@/libs/util";

export default {
  name: "CustomDatePicker",
  
  props:{
    value:{
    type: Array,
    default:function(){
      return [new Date('1990-01-01'),new Date(Date.now()+60*60*1000*24)]
    }
  }
  },
  data() {
    return {
      options: config.options
    };
  },
  methods: {  
    handleInput($event){
      this.$emit('input',$event)
    } 
  }
};
</script>
