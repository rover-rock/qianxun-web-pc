import { search_company } from '@/apis/auto_complete';
<style scoped lang="less">
    .introduction{
            height: 100%;
    background: #ffffff;
    }
    .banner{
        background-image: url("../images/banner.jpg");
        background-position: center;
    background-repeat: repeat;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 15px;
    margin-bottom: 40px;
    }
    .title{
        text-align: center;
            color: #535353;
            font-size: 1.6em;
            padding: 20px;
            margin-bottom: 30px;
    }
    .block{
        display: flex;
        justify-content: center;
        margin-bottom: 70px;
    }
    .block-img{
        margin: 0 60px;
        width: 250px;
        height: 250px;
    }
    .block-txt{
        width: 500px;
    margin: 0 60px;
    font-size: 14px;
    color: #606266;
    letter-spacing: 0;
    text-align: justify;
    line-height: 30px;
        h3 {
            position: relative;
    font-size: 20px;
    color: #303133;
        }
        h3:before {
            position: absolute;
    top: 6px;
    left: -10px;
    width: 3px;
    height: 22px;
    content: '';
    background: #1989FA;
        }
        p {
            margin-top: 20px;
        };
    }
</style>
<template>
    <div class="introduction">
        <div class="banner">
            <Button style="width:100px;" type="success" size='large' to="/report/Astock">开始探索</Button>
        </div>        
        <div style="text-align: center;
    font-weight: bold;
    font-size: 1.9em;">青藤 Data Service</div>
        <div class="title">
            资本市场信息服务供应商，专注于审计领域，为审计机构、审计师赋能，提高审计行业信息化水平。
        </div>
        <div class="block">
            <img  class= "block-img" src="../images/icon.jpg" alt="">
            <div class="block-txt">
                <h3>公告检索</h3>
                <p>同步更新A股、新三板、拟上市公司发布的公告，通过对PDF公告进行解析，并提取目录结构，可实现公告目录导航以及关键词检索。</p>
            </div>
        </div>
        <div class="block">
            <div class="block-txt">
                <h3>IPO</h3>
                <p>同步更新IPO排队信息，可实现精准检索，方便用户获取并浏览拟上市公司最新动态。</p>
            </div>       
                 <img  class= "block-img" src="../images/icon.jpg" alt="">

        </div>
        <div class="block">
            <img  class= "block-img" src="../images/icon.jpg" alt="">
            <div class="block-txt">
                <h3>审计数据</h3>
                <p>通过提取上市公司发布的公告内容，将审计师常用的数据，做成标准的数据结构，实现多维度精准检索，提升审计效率。目前可查询关键审计事项、非标意见、审计收费、投资关注问题、行政处罚</p>
            </div>
        </div>
        <div class="block">
            
            <div class="block-txt">
                <h3>审计工具</h3>
                <p>目前开发上线的审计工具包括快递信息批量截图、函证地址批量验证</p>
            </div>
            <img  class= "block-img" src="../images/icon.jpg" alt="">
        </div>
        <div class="block">
            <img  class= "block-img" src="../images/icon.jpg" alt="">
            <div class="block-txt">
                <h3>案例</h3>
                <p>视野案例：数据采集“中国会计视野论坛”CPA业务探讨板块版主的每天答疑;税务案例：数据采集国家税务总局、各省级税务局以及12366发布的答疑
</p>
            </div>
        </div>
        <div class="block">
            
            <div class="block-txt">
                <h3>法规法库</h3>
                <p>可关键词检索与审计相关的法律法规以及税收法规</p>
            </div>
            <img  class= "block-img" src="../images/icon.jpg" alt="">
        </div>
        <div style="text-align: center;
    font-size: 1.2em;">
            了解我们
        </div>
        <div style="display: flex;
    justify-content: center;margin-bottom:40px;">
            <img style="width: 80px;
    height: 80px;" src="../images/code.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
  }
};
</script>
