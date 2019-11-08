<style scoped lang="less">
.logo {
  font-size: 20px;
  color: chocolate;
  font-weight: bold;
  width: 10%;
  text-align: center;
  height: 64px;
  line-height: 64px;
}
</style>
<template>
  <Layout>
    <Header>
      <div style="display:flex;justify-content: space-between;">
        <div class="logo">青藤数据</div>
        <Menu mode="horizontal" theme="dark" @on-select="show_user_drawer = !show_user_drawer">
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
      </div>
    </Header>
    <Layout>
      <Sider :style="{height:'100vh',overflow: 'scroll'}" :width="250">
        <Menu
          mode="vertical"
          accordion
          theme="dark"
          active-name="1"
          class="header-menu"
          width="auto"
        >
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
              <MenuItem name="7-1">关键审计事项查询</MenuItem>
              <MenuItem name="7-2" to="/audit/feibiao">非标意见具体内容查询</MenuItem>
              <MenuItem name="7-3" to="/audit/fees">审计收费查询</MenuItem>
              <MenuItem name="7-5" to="/audit/case">券商研报关键词查询</MenuItem>
              <MenuItem name="7-6" to="/audit/wenda">投资者关注问题查询</MenuItem>
              <MenuItem name="7-9" to="/punish">行政处罚</MenuItem>
              <MenuItem name="7-7" to="/audit/case">关联方核查功能</MenuItem>
              <MenuItem name="7-8" to="/audit/case">研发资本化比例查询</MenuItem>
              <MenuItem name="7-10" to="/audit/case">公司负面信息检索</MenuItem>           
          </Submenu>
          <MenuItem name="3-5" to="/audit/tools">
          <Icon type="ios-stats" />审计工具
          </MenuItem>
          <Submenu name="10">
            <template slot="title">
              <Icon type="ios-stats" />准则及案例
            </template>
              <MenuItem name="3-2">会计审计准则及应用指南查询</MenuItem>
              <MenuItem name="3-4" to="/audit/case">会计审计处理及案例查询</MenuItem>
            </Submenu>
          <Submenu name="8">
            <template slot="title">
              <Icon type="ios-stats" />财务分析
            </template>
            <MenuItem name="8-2">联动指标剖析</MenuItem>
            <MenuItem name="8-3">行业对比评估</MenuItem>
            <MenuItem name="8-4">核心财务数据分析</MenuItem>
            <MenuItem name="8-5">财务失真识别</MenuItem>
            <MenuItem name="8-6">财务危机预警</MenuItem>
          </Submenu>
          <Submenu name="11">
            <template slot="title">
              <Icon type="ios-stats" />IT咨询
            </template>
            <MenuItem name="11-2" to="/tax/law">案例</MenuItem>
            <MenuItem name="11-4" to="/tax/wenda">服务范围</MenuItem>
          </Submenu>
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
      </Sider>
      <Content :style="{height:'100vh'}">
        <router-view name="search-panel"></router-view>
        <router-view name="info-panel"></router-view>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import userDrawer from "./user-drawer-panel";

export default {
  data() {
    return {
      show_user_drawer: false,
      collapsed: false
    };
  },
  computed: {
    menuList() {
      return this.$store.getters.menuList;
    }
  },
  mounted() {},
  methods: {
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    }
  },
  components: {
    userDrawer
  }
};
</script>
