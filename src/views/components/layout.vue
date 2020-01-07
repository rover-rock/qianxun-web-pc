<style scoped lang="less">
.logo {
  font-size: 20px;
  color: chocolate;
  font-weight: bold;
  width: 100%;
  text-align: center;
  height: 64px;
  line-height: 64px;
}
.horizontal {
  justify-content: space-between;
  float: right;
}
.navBreadcrumb {
  float: left;
  padding-left: 20px;
}
.navCase {
  height: 44px;
}
.clear {
  display: block;
  clear: both;
}
// 缓存导航
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.size {
  width: 100%;
  height: 100%;
}
.tags-nav {
  position: relative;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  .no-select;
  .size;
  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #f0f0f0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
    .scroll-body {
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .ivu-tag-dot-inner {
        transition: background 0.2s ease;
      }
    }
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
    li {
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.form-con {
  padding: 10px;
}
.catalog-btn {
  position: fixed;
  left: -18px;
  top: 47vh;
  transform: rotate(-90deg);
  background: white;
  border-radius: 5px;
  padding: 1px 10px;
  box-shadow: rgba(118, 118, 118, 0.11) 2px 0px 5px 0px;
  opacity: 1;
  cursor: pointer;
}
.container{
    background: #9e9e9e1c;
}
.content{
  width: 100vw;
}
.sider{
  top:0;
  height: 100vh;
   overflow: scroll;
   z-index:10000;
  width:250px;
    position: fixed;
    background: #515a6e;
}
.main-block{
  width: 80%;
  margin-left: 10%;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter, .fade-leave-to {
  width: 0;
  height: 0;
  top: 47vh;
}
</style>
<template>
  <div class="container">
    <div class="catalog-btn" v-if="!show_menu" @mouseenter="show_menu=true">
      <span>目录</span>
      <Icon type="ios-arrow-down" />
    </div>
    <transition name="fade">
    <div class="sider"  
      v-if="show_menu"
      @mouseleave="show_menu=false"
    >
      <div class="logo">青藤数据</div>
      <Menu 
        mode="vertical"
        accordion
        theme="dark"
        :active-name="navThis"
        :open-names="navOpen"
        @on-select="onSelect"
        class="header-menu"
        width="auto"
        ref="mymenu"
      >
        <div v-for="item in navList" :key="item.name">
          <Submenu
            v-if="item.children && item.children.length > 0"
            :name="item.name"
          >
            <template slot="title">
              <Icon type="ios-paper" />
              {{ item.title }}
            </template>
            <MenuItem
              v-for="itemChild in item.children"
              :key="itemChild.name"
              :name="itemChild.name"
              :to="itemChild.to"
              >{{ itemChild.title }}</MenuItem
            >
          </Submenu>
          <MenuItem
            v-if="item.children == undefined || item.children.length == 0"
            :name="item.name"
            :to="item.to"
          >
            <Icon type="ios-stats" />
            {{ item.title }}
          </MenuItem>
        </div>
      </Menu>
    </div>
    </transition>
    <div class="content">
      <!-- 永久导航 -->
      <div class="headerOverAll">
        <Menu mode="horizontal" theme="light" @on-select="login_out">
          <!-- 面包屑导航 -->
          <div class="navBreadcrumb">
            <Breadcrumb>
              <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon>首页
              </BreadcrumbItem>
              <BreadcrumbItem
                v-for="(item, key) in navBreadcrumb"
                :key="key"
                to="/"
              >
                <Icon type="logo-buffer"></Icon>
                {{ item.title }}
              </BreadcrumbItem>
            </Breadcrumb>
            <div class="clear"></div>
          </div>
          <div class="horizontal">
            <MenuItem name="1" to="/user/message">
              <Badge :count="3" :offset="[20, -8]">
                <Icon type="ios-chatbubbles-outline" size="20" />
              </Badge>
            </MenuItem>
            <MenuItem name="2" to="/user/help">
              <Icon type="ios-help-circle" />帮助
            </MenuItem>
            <Submenu name="3">
              <template slot="title"> <Icon type="md-person" />用户 </template>
              <MenuItem name="3-1" to="/user/config">个人中心</MenuItem>
              <MenuItem name="3-2" to="/user/message">消息中心</MenuItem>
              <MenuItem name="logout">退出登录</MenuItem>
            </Submenu>
          </div>
        </Menu>
      </div>

      <Modal v-model="show_modal" width="600" :mask-closable="false">
        <div slot="header">
          注册/登录
        </div>
        <div>
          <Tabs value="name1">
            <TabPane label="老用户登录" name="name1">
              <div class="form-con">
                <login-form @on-success-valid="handleLogin"></login-form>
              </div>
            </TabPane>
            <TabPane label="新用户注册" name="name2">
              <div class="form-con">
                <register-form
                  @on-success-valid="handleRegister"
                ></register-form>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
      <div class="main-block">
<router-view name="search-panel"></router-view>
      <router-view name="info-panel"></router-view>
      </div>
      
    </div>
  </div>
</template>
<script>
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { mapActions } from "vuex";
import Config from "@/config/config";
import { setToken } from "@/libs/util";
export default {
  data() {
    return {
      show_menu: false,
      show_modal: false,
      collapsed: false,
      navThis: "1", //打开当前页面
      navOpen: [], //当前打开的左侧导航
      navCase: [], //记录已经打开过的页面
      navBreadcrumb: [], //面包屑导航
      //缓存需要的参数
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      menuList: {
        others: "关闭其他",
        all: "关闭所有"
      },
      navList: Config.menu
    };
  },
  computed: {},
  mounted() {
    // this.navCase=JSON.parse(window.localStorage.getItem("navCase"));
    this.show_modal = !this.$store.state.hasGetUserInfo;
  },
  methods: {
    ...mapActions(["handle_login", "handle_register"]),
    login_out(name) {
      if (name !== "logout") return;
      setToken("");
      location.href = "/home";
    },
    handleLogin({ phone, password }) {
      this.handle_login({ phone, password }).then(res => {
        if (!res.success) {
          alert(res.msg);
          return;
        } else {
          this.show_modal = false;
          alert("登录成功");
        }
      });
    },
    handleRegister({ phone, password }) {
      this.handle_register({ phone, password }).then(res => {
        if (!res.success) {
          alert(res.msg);
          return;
        } else {
          this.show_modal = false;
          alert("注册成功");
        }
      });
    },
    onSelect(name) {
      if (!this.$store.state.hasGetUserInfo) {
        this.show_modal = true;
        return;
      }
      !this.navCase.some(ele => ele && ele.name === name) &&
        this.navCase.push(this.get_matched_route(name));
      this.navBreadcrumb = this.get_matched_route(name, true);
      this.navThis = name;
      //页面点击所选内容显示
      this.showItemCase();
    },
    // 所选中的内容显示
    showItemCase() {
      this.refsTag = this.$refs.tagsPageOpened;
      setTimeout(() => {
        let active_tag_index =
          this.navCase.findIndex(value => value === this.navThis) > -1 &&
          this.moveToView(this.refsTag[active_tag_index].$el);
      }, 200);
    },
    get_matched_route(name, all) {
      let i = this.navList.length;
      while (i--) {
        let nav = this.navList[i];
        if (nav.children) {
          let index = nav.children.findIndex(ele => ele.name === name);
          if (index > -1) {
            return !all ? nav.children[index] : [nav, nav.children[index]];
          }
        } else {
          if (nav.name === name) return !all ? nav : [nav];
        }
      }
    },
    //可视区域事件
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        );
      }
    },
    //左右滑动
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    //删除当前缓存标签
    handleClose(key) {
      this.navCase.splice(key, 1);
      if (this.navCase.length == 1) {
        this.handleClick(this.navCase[0]);
      } else {
        if (this.navCase[key].name == this.navThis) {
          this.handleClick(this.navCase[key]);
        }
      }
      this.showItemCase();
    },
    //选中缓存模块
    handleClick(item) {
      if (!this.$store.state.hasGetUserInfo) {
        this.show_modal = true;
        return;
      }
      this.navThis = item.name;
      this.navBreadcrumb = this.get_matched_route(item.name, true);
      this.navOpen = [this.navBreadcrumb[0].name];
      this.$nextTick(function() {
        this.$refs.mymenu.updateOpened();
      });
      this.$router.push(item.to);
    },
    //删除全部
    handleTagsOption(type) {
      if (type.includes("all")) {
        // 关闭所有，除了home
        this.navCase.splice(1, this.navCase.length);
        this.handleClick(this.navCase[0]);
      } else if (type.includes("others")) {
        // 关闭除当前页和home页的其他页
        let i = 0;
        for (let index = 0; index < this.navCase.length; index++) {
          if (this.navCase[index].name == this.navThis) {
            i = index;
          }
        }
        this.navCase.splice(i + 1, this.navCase.length);
        this.navCase.splice(1, this.navCase.length - 2);
      }
    },
    onSelectAleradry() {}
  },
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>
