<style scoped lang="less">
.container {
  width: 1000px;
  height: 100px;
  padding: 20px;
}
.method {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
}
.tip {
  text-align: center;
}

.file-chooser {
  display: block;
  border: 1px solid lightgray;
  padding: 4px;
  background: white;
}
.back-button {
  margin: 10px;
  font-size: 18px;
  cursor: pointer;
  :hover {
    color: red;
  }
}
.btn-block {
  display: flex;
  justify-content: space-evenly;
  margin: 25px 0;
}
.kdi-info-panel {
  display: flex;
  .kdi-info-header{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img{
      width: 25px;
    border-radius: 10px;
    }
    span{
      margin:0 10px;
    }
    
  }
  .kdi-info-block {
    background: white;
    padding: 20px;
    margin: 20px;
  }
}
</style>
<template>
  <div>
    <span @click="back">
      <div class="back-button"><Icon type="md-arrow-back" size="20" />返回</div>
    </span>

    <div class="container">
      <div class="method">
        方式一
        <Input
          style="width:500px"
          search
          enter-button
          placeholder="输入单号查询"
        />
      </div>
      <div class="method">
        方式二
        <input
          class="file-chooser"
          type="file"
          style="width:500px"
          @change="handleChangeImg"
        />
        <Button @click="submit">查询</Button>
      </div>
      <p class="tip">
        excel文件格式：快递单号，截图文件名两列。模板文件：模板.xlsx
        <a href="http://106.52.130.31/example.xlsx">下载</a>
        <br />请在模板文件上进行修改
      </p>
      <div class="btn-block">
        <Button @click="save_clip_img">
          保存快递截图
        </Button>
        <Button>
          下载汇总excel表格
        </Button>
      </div>
      <div class="kdi-info-panel">
        <Card
          class="kdi-info-block"
          v-for="(info, index) in kdi_info"
          :key="index"
        >
          <template v-if="info.status == 0">
            <div class="kdi-info-header">
              <img :src="info.result.logo">
              <span>{{ info.result.expName }}</span>
              <span>单号：{{info.result.number}}</span>
            </div>
            <Timeline>
              <TimelineItem
                color="green"
                v-for="(item, i) in info.result.list"
                :key="i"
              >
                <p>{{ item.time }}</p>
                <p>{{ item.status }}</p>
              </TimelineItem>
            </Timeline>
          </template>
          <div v-else>
            {{ info.msg }}
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import JSzip from "jszip";
import { get_kdi } from "@/apis/tool";
export default {
  data() {
    return {
      file: null,
      kdi_info: []
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    back() {
      this.$router.back();
    },
    handleChangeImg(e) {
      const file = e.target.files.item(0);
      // 如果不选择图片
      if (file === null) {
        return;
      }
      this.file = file;
    },
    submit() {
      let data = new FormData();
      data.append("imgName", this.file.name);
      data.append("img", this.file);
      get_kdi(data).then(response => {
        //获取快递查询数据
        console.log(response.data);
        this.kdi_info = response.data.data;
      });
    },
    async save_clip_img() {
      let zip = new JSzip();
      const node_arr = document.querySelectorAll(".kdi-info-block");
      let canvas_arr = await Promise.all(
        Array.prototype.slice
          .call(node_arr)
          .map(ele => html2canvas(ele, { scale: 4 }))
      );
      canvas_arr.forEach((canvas, index) => {
        //data url 和 base64区别就是前缀的一串字符。
        zip.file(
          "img" + index + ".png",
          canvas.toDataURL("image/png").replace("data:image/png;base64,", ""),
          { base64: true }
        );
      });
      zip.generateAsync({ type: "base64" }).then(function(content) {
        location.href = "data:application/zip;base64," + content;
      });
    }
  }
};
</script>
