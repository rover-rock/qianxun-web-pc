<style scoped lang="less">
.tool-container {
  width: 1000px;
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

    <div class="tool-container">
      <div class="method">
        <input
          class="file-chooser"
          type="file"
          style="width:500px"
          @change="handleChangeImg"
        />
        <Button @click="submit">查询</Button>
      </div>
      <p class="tip">
        excel文件格式：公司名称，地址两列。模板文件：模板.xlsx
        <a href="http://106.52.130.31/hanzheng.xlsx">下载</a>
        <br />请在模板文件上进行修改
      </p>
      <div class="btn-block">
        <Button>
          下载汇总excel表格
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import JSzip from "jszip";
import { check_address } from "@/apis/tool";
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
      check_address(data).then(response => {
        //获取快递查询数据
        console.log(response.data);
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
