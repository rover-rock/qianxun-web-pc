<style scoped lang="less">

.header {
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .result {
    font-size: 1.3em;
  }
}
.list-item {
  display: flex;
  justify-content: space-between;
  .part1 {
    display: flex;
    align-items: center;
  }
  .part2 {
    display: flex;
    align-items: center;
  }
  .title {
    padding: 5px 10px;
    max-width: 40vw;
  }
  .title:hover {
    font-weight: bolder;
  }
  .date {
    color: gray;
    margin-left: 5px;
  }
  .link_btn {
    margin-left: 5px;
  }
  .download_btn {
    line-height: 15px;
    margin-left: 5px;
    height: 15px;
  }
  .download_btn img {
    width: 15px;
    height: 15px;
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
.detail-item {
  font-size: 1.1em;
}
.detail-content {
  font-size: 1.3em;
}
.detail-title {
  margin-bottom: 25px;
  margin-top: 10px;
}
.detail-time {
  font-weight: bolder;
}
</style>
<template>
  <div class="result-panel">
    <div class="header">
      <Checkbox @on-change="checkall()" size="large">{{!check_all ? '全选' : '全不选'}}</Checkbox>
      <div class="result">
        找到
        <span style="color:red;">{{formated_total}}</span> 条结果
      </div>
      <div>
        <ButtonGroup shape="circle">
          <Button @click="orderByTime('latest')">最近</Button>
          <Button @click="orderByTime('earlest')">最早</Button>
        </ButtonGroup>
        <Button @click="unfoldAll()">{{fold_all ? '全部展开' : '全部折叠'}}</Button>
      </div>
    </div>
    <Divider></Divider>
    <div class="list-container">
      <Card v-for="(item, index) in results" :key="index">
        <div class="list-item">
          <div class="part1" @click="unfold(item)">
            <Checkbox size="large" v-model="item.checked"></Checkbox>
            <Tag color="volcano">{{item.type}}</Tag>
            <div v-html="item.title" class="title text-ellipsis"></div>
          </div>
          <div class="part2">
            <a :href="'/one-zhunze?link='+encodeURIComponent(item.link)" target="_blank">详情</a>
            <span class="date">{{item.date}}</span>
            <a class="link_btn" :href="item.link" target="_blank">源</a>
          </div>
        </div>
        <div class="collapse-panel" :class="{'collapsed':item.collapsed}">
          <Tag color="magenta">【{{item.source}}】</Tag>
          <span @click="unfold(item)" v-html="item.content"></span>
        </div>
      </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <Page
      class="pager"
      :total="total"
      :current="current_page"
      @on-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      show-total
      show-elevator
      show-sizer
    ></Page>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import util from "@/libs/util";

const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  "tax"
);
export default {
  data() {
    return {
      modalShow: false,
      check_all: false,
      fold_all: true,
      page_size: 10,
      current_page: 1,
      sort: "latest",
      result: []
    };
  },
  computed: {
    ...mapState({
      total: state => state.total,
      search_result: state => state.search_results,
      keywords: state => state.keywords,
      spinShow: state => state.spinShow
    }),
    formated_total() {
      return util.format_number(this.total);
    },
    results() {
      let data = this.search_result;
      let keywords = this.keywords;
      data.forEach(item => {
        item.title = util.render_multi_keywords_red(keywords.title, item.title);
        item.content = this.render_multi_keywords_red(
          keywords.content,
          item.content
        );
      });
      return data;
    }
  },
  beforeDestroy() {
    this.clear_search_result();
  },
  methods: {
    ...mapActions(["get_zhunze"]),
    ...mapMutations(["clear_search_result", "set_spin"]),
    render_multi_keywords_red(keywords, text) {
      const get_list_content_start = (keywords, text) => {
        if (!keywords) return 0;
        let keys = keywords.split(/\s/);
        let seg1 = text.slice(0, text.indexOf(keys[0]));
        let res = seg1.lastIndexOf("<p");
        let count = 0;
        return (res = res < 0 ? 0 : res);
      };
      
      const get_paraphs = (text) => {
        let end = text.indexOf('</p>')
        end = text.indexOf('</p>',end+3)
        end = text.indexOf('</p>',end+3)
        end = text.indexOf('</p>',end+3)
        end = text.indexOf('</p>',end+3)
        return text.slice(0,end)+'<p>............</p>'
      }
      
      let start = get_list_content_start(keywords, text);

      return util.render_multi_keywords_red(
        keywords,
        get_paraphs(text.slice(start))
      );
    },
    checkall() {
      this.check_all = !this.check_all;
      this.search_result.forEach(item => {
        item.checked = this.check_all;
      });
    },
    unfoldAll() {
      this.fold_all = !this.fold_all;
      this.search_result.forEach(item => {
        item.collapsed = this.fold_all;
      });
    },
    unfold(item) {
      item.collapsed = !item.collapsed;
    },
    orderByTime(type) {
      this.sort = type;
      this.current_page = 1;
      this.search_with_params();
    },
    onPageChange(current) {
      this.current_page = current;
      this.search_with_params();
    },
    onPageSizeChange(page_size) {
      this.page_size = page_size;
      this.current_page = 1;
      this.search_with_params();
    },
    search_with_params() {
      this.set_spin(true);
      this.get_zhunze({
        ...this.keywords,
        current_page: this.current_page,
        page_size: this.page_size,
        sort: this.sort
      }).then(() => this.set_spin(false));
    }
  }
};
</script>
