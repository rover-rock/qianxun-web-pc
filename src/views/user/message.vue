<style scoped lang="less">
.container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
}
.tool {
  width: 300px;
  height: 80px;
  margin-top: 20px;
  margin-left: 15px;
}
.message-container{
  display: flex;
  
}
</style>
<template>
  <div class="container">
    <Tabs value="name1">
      <TabPane label="系统消息" name="name1">
        <div class="message-container">
          <List item-layout="vertical">
            <ListItem v-for="item in messages" :key="item.title">
              <ListItemMeta
                :title="item.title"
                :description="item.description"
              />
              {{ item.content }}
            </ListItem>
          </List>
          <div class="message-detail">
            消息详情
          </div>
        </div>
      </TabPane>
      <TabPane label="意见反馈" name="name2"> </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messages:[{title:'标题',description:'描述',content:'内容'}]
    };
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
