<style lang="less">
@import "styles/common.less";
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
<template>
  <div style="width:100%;height:100%;overflow:scroll;">
    <router-view></router-view>
    <footer class="footer">
      <div style="text-align: center;background: #374067;color:white;padding:10px;">
        <h6>
          © 2020 Auto Regression
          <a href="http://beian.miit.gov.cn" target="_blank" style="color:white;"
            >粤ICP备19149394号</a
          >
        </h6>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
