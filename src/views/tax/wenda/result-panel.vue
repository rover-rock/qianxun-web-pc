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
.detail-container{
  margin-top: 30px;
}
.detail-item{
  font-size: 1.1em;
}
.detail-content {
  font-size: 1.1em;
}
.detail-title {
  text-align: center;
  font-size: 1.3em;
    font-weight: bolder;
    padding: 15px;
}
.detail-subtitle{
  text-align: center;
  padding-bottom: 10px;
}
.detail-time{
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
            <Tag color="volcano">{{item.banner}}</Tag>
            <div v-html="item.question" class="title text-ellipsis"></div>
          </div>
          <div>
            <Tooltip content="点击查看详情" placement="top">
              <Button shape="circle" @click=" showOne(item) ">查看详情</Button>
            </Tooltip>
            <span class="date">{{item.reply_time}}</span>
            <a :href="item.link" target="_blank">{{item.banner === '12366'?' ':'源'}}</a>
            
            <Button>收藏</Button>
          </div>
        </div>
        <div class="collapse-panel" :class="{'collapsed':item.collapsed}">
          <Tag color="magenta">提问</Tag>:
          <span @click="unfold(item)" v-html="item.question"></span>
          <br />
          <br />
          <span class="author">回复：</span>
          <span v-html="item.reply"></span>
        </div>
      </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Modal v-model="modalShow"  :scrollable="true" width="800">
        <div slot="header" style="color:#f60;display:flex;justify-content:space-between;align-items:center;">
          <h3>回复详情</h3>
          <Button shape="circle" icon='ios-heart'  style="margin-right:100px">
            喜欢
          </Button>
          
        </div>
        <div>
          <div>
            <Row>
              <Col span="12">
                <Tag color="success">来&emsp;&emsp;&emsp;源</Tag>{{ result.banner }}
              </Col>
              <Col span="12">
                <Tag color="success">税&emsp;&emsp;&emsp;种</Tag
                >{{ result.banner === '12366' ? result.category : result.banner }}
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <Tag color="success">条文有效性</Tag>{{ result.is_effictive }}
              </Col>
            </Row>
          </div>
          <div class="detail-container">
            <Timeline>
          <TimelineItem class="detail-item" color="green">
            <p class="detail-time">{{result.reply_time}}</p>
            <div>
              <Tag color="success">提问</Tag>
              <span v-html="result.question" class="detail-content"></span>
            </div>
            <div>
              <Tag color="error">回复</Tag>
              <span v-html="result.reply" class="detail-content"></span>
            </div>
            <Divider></Divider>
          </TimelineItem>
        </Timeline>
          </div>
        
        </div>
        
      </Modal>
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

const { mapActions, mapMutations, mapState } = createNamespacedHelpers("tax");
export default {
  data() {
    return {
      modalShow: false,
      check_all: false,
      fold_all: true,
      page_size: 10,
      current_page: 1,
      sort: "latest",
      result: {}
    };
  }, 
  computed: {
    ...mapState({
      spinShow: state => state.spinShow,
      total: state => state.total,
      search_result:state => state.search_results
    }), 
    formated_total() {
      return util.format_number(this.total);
    },
    results() {
      let data = this.search_result;
      let keywords = this.$store.state.tax.keywords;
      data.forEach(item => {
        item.question = util.render_multi_keywords_red(
          keywords.question,
          item.question
        );
        item.reply = util.render_multi_keywords_red(
          keywords.reply,
          item.reply
        );
      });
      return data;
    }
  },
  beforeDestroy() {
    this.clear_search_result();
  },
  methods: {
    ...mapActions(["clear_search_result", "get_wenda"]),
    ...mapMutations(["set_spin"]),
    isBlank(str){
      return str === "" || /^[\s↵]+$/.test(str)
    },
    showOne( item ) {
        this.result = item;
        this.modalShow = true;
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
      this.get_wenda({
        ...this.$store.state.tax.keywords,
        current_page: this.current_page,
        page_size: this.page_size,
        sort: this.sort
      }).then(() => this.set_spin(false));
    }
  }
};
</script>
