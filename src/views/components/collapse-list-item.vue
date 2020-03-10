<style lang="less" scoped>
    .list-item {
  display: flex;
  justify-content: space-between;
  .part1 {
    display: flex;
    align-items: center;
  }
  .title {
    padding: 5px 10px;
    max-width: 400px;
  }
  .title:hover {
    font-weight: bolder;
  }
  .date {
    color: gray;
  }
}

.collapse-panel {
  padding: 15px 30px;
  transition: height 1s, padding 0.3s;
  .author {
    background: gray;
    color: white;
    padding: 3px 7px;
    border-radius: 5px;
  }
}
.collapsed {
  height: 0;
  padding: 0px 30px;
  overflow: hidden;
}
</style>
<template>
  <Card :item="item">
    <div class="list-item">
      <div class="part1" @click="unfold(item)">
        <Checkbox size="large" v-model="item.checked"></Checkbox>
        <Tag color="volcano">[{{ item.code }}]{{ item.short_name }}</Tag>
        <Tag class="date">{{ item.annul }}</Tag>
        <div v-html="item.title" class="title text-ellipsis"></div>
      </div>
      <div>
        <Tooltip content="点击查看详情" placement="top">
          <Button shape="circle" @click="$emit('show_detail',item)">查看详情</Button>
        </Tooltip>
        
        <Button>收藏</Button>
      </div>
    </div>
    <div class="collapse-panel" :class="{ collapsed: item.collapsed }">
      <Tag color="magenta">{{ item.category }}</Tag
      >
      <span @click="unfold(item)" v-html="item.info"></span>
    </div>
  </Card>
</template>
<script>

export default {
  name: "CollapseListItem",
  props: ["item"],
  data() {
    return {
      matched_company: []
    };
  },
  methods: {
    unfold(item) {
      item.collapsed = !item.collapsed;
    }
  }
};
</script>
