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
              @input="$emit('input',$event)"
              :options="options"
            ></DatePicker>
</template>
<script>
import config from "@/config/config";

export default {
  name: "CustomDatePicker",
  props:['value'],
  data() {
    return {
      options: config.options
    };
  },
  methods: {   
  }
};
</script>
