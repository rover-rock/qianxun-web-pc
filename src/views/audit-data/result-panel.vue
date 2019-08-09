<style scoped>
.info-panel {
  background: white;
  margin: 20px;
  padding: 20px;
}
</style>
<template>
  <component :is="componentId"></component>
</template>
<script>

import name2Result from "./name2-result";
import name3Result from "./name3-result";
export default {
  data() {
    return {
    };
  },
  computed:{
    componentId(){
      return this.$store.state.audit.active_component
    }
  },
  mounted() {
   
  },
  methods: {
    
  },
  components:{
    name2Result,
    name3Result
  }
};
</script>
