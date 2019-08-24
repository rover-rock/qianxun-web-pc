<style scoped lang="less">
.container{
    height: 200px;
}
.history-block {
  display: flex;
  flex-wrap: wrap;
  height: 100px;
  overflow-y: scroll;
  .item {
    margin: 2px 1px;
  }
}
</style>
<template>
  <Card :bordered="false" class="container">
    <p slot="title">历史记录</p>
    <div class="history-block">
      <div :padding="1" v-for="(item, index) in search_history" :key="index" class="item">
        <Tag type="border" closable color="success" @on-close="deleteTag(index)">{{item}}</Tag>
      </div>
    </div>
  </Card>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
      this.get_search_history();
  },
  computed: {
    search_history() {
      return this.$store.state.search_history;
    }
  },
  methods: {
    deleteTag(index) {
      let data = this.$store.state.search_history.slice();
      data.splice(index, 1)
      this.$store.commit('set_search_history',data);
      localStorage.setItem("search_history", JSON.stringify(data));
    },
    get_search_history() {
        let data = localStorage.getItem("search_history")
        console.log(data)
        try{
            data = JSON.parse(data)
        }
        catch(e){
            data = []
        }
      this.$store.commit('set_search_history',data);
    }
  }
};
</script>
