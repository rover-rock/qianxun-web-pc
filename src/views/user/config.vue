<style scoped lang="less">
.container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
}
.item{
  margin: 0 20px;
    padding: 20px 0;
    p {
      height: 40px;
    padding-left: 10px;
    font-size: 14px;
    color: #999999;
    .title{
      display: inline-block;
    width: 75px;
    text-align: left;
    vertical-align: top;
    color: #666666;
    padding-top: 10px;
    font-size: 14px;
    }
    .value{
      display: inline-block;
    text-align: left;
    vertical-align: top;
    color: #666666;
    padding-top: 10px;
    font-size: 14px;
    }
    }
}
</style>
<template>
  <div class="container">
    <Card dis-hover  :shadow='true' style="width:1000px;">
      <p slot="title">账户信息</p>
      <div class="item">
          <h3 style="padding-left: 10px;">欢迎！{{user.phone}}</h3>
          <p  style="display: inline">感谢您的使用和支持！</p>
          <p><span class="title">单位：</span><span class="value"></span></p>
          <p><span class="title">部门：</span><span class="value"></span></p>
          <p><span class="title">职位：</span><span class="value"></span></p>
      </div>
    </Card>
  </div>
</template>
<script>
import { get_user_info } from '@/apis/user'
import { getToken } from '@/libs/util'

export default {
  data() {
    return {
      user:{}
    };
  },
  components: {},
  mounted() {
    const token = getToken()
    get_user_info(token).then(res => {
      this.user = res.data.data
    })
  },
  beforeDestroy() {},
  methods: {}
};
</script>
