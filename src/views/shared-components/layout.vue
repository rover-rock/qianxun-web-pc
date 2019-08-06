<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  background: white;
}
.logo {
  font-size: 20px;
  color: chocolate;
  font-weight: bold;
}
.ivu-layout .ivu-layout-has-sider{
    padding: 20px 80px;
}

</style>
<template>
  <Layout>
    <Header class="header">
      <span class="logo">青藤</span>
      <Menu mode="horizontal" theme="light" active-name="1" class="header-menu">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />公告检索
          </template>
          <MenuItem name="1-1" to="/report/A-stock">A股</MenuItem>
          <MenuItem name="1-2">新三板</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-paper" />IPO
          </template>
          <MenuItem name="2-1" to="/IPO/shenjiaosuo">深交所</MenuItem>
          <MenuItem name="2-2" to="/IPO/shangjiaosuo">上交所主板</MenuItem>
          <MenuItem name="2-3" to="/IPO/kechuangban">科创板</MenuItem>
          <MenuItem name="2-4" to="/IPO/fudao">辅导信息</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />审计数据
          </template>
          <MenuItem name="3-1">上市规则查询</MenuItem>
          <MenuItem name="3-2">会计审计准则及应用指南查询</MenuItem>
          <MenuItem name="3-3" to="/audit-data/data-search">审计数据查询</MenuItem>
          <MenuItem name="3-4" to="/audit-data/case">会计审计处理及案例查询</MenuItem>
        </Submenu>
        <MenuItem name="4" to="/tools">
          <Icon type="ios-people" />审计工具
        </MenuItem>
        <MenuItem name="5" to="/punish">
          <Icon type="ios-people" />行政处罚
        </MenuItem>
        <MenuItem name="6" to="/news">
          <Icon type="ios-construct" />财经资讯
        </MenuItem>
      </Menu>
      <Menu mode="horizontal" theme="light">
        <MenuItem name="1">
          <Icon type="ios-chatbubbles-outline" size="20" />
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-help-circle" />帮助
        </MenuItem>
        <MenuItem name="3">
          <Icon type="md-person" />用户
        </MenuItem>
      </Menu>
    </Header>
    <Layout>
      <Content>
        <router-view name="search-panel"></router-view>
        <router-view name="info-panel"></router-view>
      </Content>
      <Sider width="300" :style="{background: 'rgb(245, 247, 249)'}" hide-trigger>
        <router-view name="sider"></router-view>
      </Sider>
    </Layout>
    <Footer>
      <div style="text-align: center;">
            <h6>© 2019 Auto Regression  京ICP备16019373号-4</h6>
            <div>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502033276">
                    <p class="para-beian">京公网安备 11010502033276号</p>
                </a>
            </div>
      </div>
    </Footer>
  </Layout>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  mounted(){
  },
  methods: {
  }
};
</script>
