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
.ivu-layout .ivu-layout-has-sider {
  padding: 20px 80px;
}
</style>
<template>
  <Layout>
    <Header class="header">
      <span class="logo">青藤数据</span>
      <Menu mode="horizontal" theme="light" active-name="1" class="header-menu">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />公告检索
          </template>
          <MenuItem name="1-1" to="/report/Astock">A股</MenuItem>
          <MenuItem name="1-2" to="/report/xinsan">新三板</MenuItem>
          <MenuItem name="1-2" to="/report/kechuang">科创板</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-paper" />IPO
          </template>
          <MenuItem name="2-1" to="/IPO/shenjiaosuo">深交所</MenuItem>
          <MenuItem name="2-2" to="/IPO/shangjiaosuo">上交所主板</MenuItem>
          <MenuItem name="2-3" to="/IPO/kechuangban">科创板</MenuItem>
          <MenuItem name="2-4" to="/IPO/fudao">辅导信息</MenuItem>
          <MenuItem name="2-5" to="/IPO/rule">上市规则查询</MenuItem>
        </Submenu>
        <Submenu name="7">
          <template slot="title">
            <Icon type="ios-stats" />审计数据
          </template>
          <MenuGroup title="审计案例及工具">
            <MenuItem name="3-2">会计审计准则及应用指南查询</MenuItem>
            <MenuItem name="3-4" to="/audit/case">会计审计处理及案例查询</MenuItem>
            <MenuItem name="3-5" to="/audit/tools">审计工具</MenuItem>
          </MenuGroup>
          <MenuGroup title="数据查询">
            <MenuItem name="7-1">关键审计事项查询</MenuItem>
            <MenuItem name="7-2" to="/audit/feibiao">非标意见具体内容查询</MenuItem>
            <MenuItem name="7-3" to="/audit/fees">审计收费查询</MenuItem>
            <MenuItem name="7-5" to="/audit/case">券商研报关键词查询</MenuItem>
            <MenuItem name="7-6" to="/audit/wenda">投资者关注问题查询</MenuItem>
            <MenuItem name="7-7" to="/audit/case">关联方核查功能</MenuItem>
            <MenuItem name="7-8" to="/audit/case">研发资本化比例查询</MenuItem>
          </MenuGroup>
        </Submenu>
        <Submenu name="8">
          <template slot="title">
            <Icon type="ios-stats" />财务分析
          </template>
          <MenuItem name="8-2">联动指标剖析</MenuItem>
          <MenuItem name="8-4">行业对比评估</MenuItem>
        </Submenu>
        <MenuItem name="5" to="/punish">
          <Icon type="ios-people" />行政处罚
        </MenuItem>
        <Submenu name="9">
          <template slot="title">
            <Icon type="ios-stats" />税后法规及案例
          </template>
          <MenuItem name="9-2" to="/tax/law">法规查询</MenuItem>
          <MenuItem name="9-4" to="/tax/wenda">税后案例查询</MenuItem>
        </Submenu>
        <MenuItem name="6" to="/news">
          <Icon type="ios-construct" />财经资讯
        </MenuItem>
      </Menu>
      <Menu mode="horizontal" theme="light" @on-select="show_user_drawer = !show_user_drawer">
        <MenuItem name="1">
          <Badge :count="3" :offset="[20,-8]">
            <Icon type="ios-chatbubbles-outline" size="20" />
          </Badge>
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-help-circle" />帮助
        </MenuItem>
        <MenuItem name="3">
          <Icon type="md-person" />用户
        </MenuItem>
        <user-drawer :show="show_user_drawer"></user-drawer>
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
        <h6>© 2019 Auto Regression 京ICP备16019373号-4</h6>
        <div>
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502033276"
          >
            <p class="para-beian">京公网安备 11010502033276号</p>
          </a>
        </div>
      </div>
    </Footer>
  </Layout>
  <!-- </div> -->
</template>
<script>
import userDrawer from "./user-drawer-panel";

export default {
  data() {
    return {
      show_user_drawer: false
    };
  },
  mounted() {},
  methods: {},
  components: {
    userDrawer
  }
};
</script>
