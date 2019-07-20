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
.search-panel {
  height: 300px;
  background: white;
  margin: 5%;
    padding: 20px;
}
.info-panel {
  height: 500px;
  background: white;
  margin: 5%;
  padding: 20px;
}
.panel1 {
  margin: 10px;
}
</style>
<template>
  <Layout>
    <Header class="header">
      <span class="logo">千寻</span>
      <Menu mode="horizontal" theme="light" active-name="1" class="header-menu">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />公告检索
          </template>
          <MenuItem name="1-1">公告检索</MenuItem>
          <MenuGroup title="关键词查询">
            <MenuItem name="1-2">。。。查询</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="2">
          <Icon type="ios-people" />准则查询
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />案例汇编
          </template>
          <MenuGroup title="查询">
            <MenuItem name="3-1">准则查询</MenuItem>
            <MenuItem name="3-2">上市规则查询</MenuItem>
          </MenuGroup>
          <MenuGroup title="处理">
            <MenuItem name="3-4">会计处理</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="4">
          <Icon type="ios-people" />审计工具
        </MenuItem>
        <MenuItem name="5">
          <Icon type="ios-construct" size="16" />财经资讯
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
        <div class="search-panel">
          <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="Username">
                <span slot="prepend">公司</span>
                <span slot="append">自选</span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="匹配关键字">
                <span slot="prepend">标题</span>
              </Input>
            </FormItem>
            <FormItem prop="chapter">
              <Input type="text" v-model="formInline.password" placeholder="匹配关键字">
                <span slot="prepend">章节</span>
              </Input>
            </FormItem>
            <FormItem prop="content">
              <Input type="text" v-model="formInline.password" placeholder="匹配关键字">
                <span slot="prepend">正文</span>
              </Input>
            </FormItem>
            <FormItem>
              <DatePicker
                :value="value2"
                format="yyyy/MM/dd"
                type="daterange"
                placement="bottom-end"
                placeholder="Select date"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
          </Form>
        </div>
        <div class="info-panel">
            <Tabs value="name1">
        <TabPane label="标签一" name="name1">最新公告</TabPane>
        <TabPane label="标签二" name="name2">证监会要闻</TabPane>
        <TabPane label="标签三" name="name3">证监会最新发布会</TabPane>
    </Tabs>
        </div>
      </Content>
      <Sider hide-trigger>
        <div class="panel1">
          <Card :bordered="false">
            <p slot="title">搜索历史</p>
            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type.</p>
          </Card>
        </div>
        <div class="panel2">
          <Card :bordered="false">
            <p slot="title">匹配公司</p>
            <Collapse simple>
              <Panel name="1">
                史蒂夫·乔布斯
                <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
              </Panel>
              <Panel name="2">
                斯蒂夫·盖瑞·沃兹尼亚克
                <p
                  slot="content"
                >斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
              </Panel>
              <Panel name="3">
                乔纳森·伊夫
                <p
                  slot="content"
                >乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
              </Panel>
            </Collapse>
          </Card>
        </div>
      </Sider>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
