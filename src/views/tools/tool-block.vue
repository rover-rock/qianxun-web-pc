<style scoped lang="less">
  .line1 {
    display: flex;
    align-items: center;
    span {
      color: #4caf50;
      font-weight: bold;
      font-size: 15px;
      margin-left: 10px;
    }
  }
  .line2 {
    margin-top: 5px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    span {
      margin-left: 5px;
    }
  }

</style>
<template>
  
    <Card>
      <router-link :to="to">
        <div class="line1">
          <Icon :type="type" size="30" />
          <span>{{name}}</span>
        </div>
      </router-link>
      <div class="line2">
        <Icon type="md-heart-outline" />
        <span>{{like_num}}</span>
      </div>
    </Card>
</template>
<script>

export default {
  data() {
    return {};
  },
  props:[
      'to',
      'type',
      'like_num',
      'name'
  ],
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
