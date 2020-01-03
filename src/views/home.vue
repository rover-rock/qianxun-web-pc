<style scoped lang="less">
    .introduction{
        padding: 70px 0 0;
            height: 100%;
    background: white;
    }
    .block{
        display: flex;
        justify-content: center;
        margin-bottom: 70px;
    }
    .block-img{
        margin: 0 60px;
        width: 250px;
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
        <div class="block">
            <img  class= "block-img" src="../images/error-401.svg" alt="">
            <div class="block-txt">
                <h3>法律法规库</h3>
                <p>全面梳理并实时扩充资本市场法律法规、行业政策，借助于金融领域专家的经验进行跨市场、跨领域横向纵向细分，提供精准智能的条文搜索，覆盖资本市场、国资监管、财务税收、跨境业务、行业法规等20多个专题、超过10000部法规。</p>
            </div>
        </div>
        <div class="block">
            <div class="block-txt">
                <h3>功能介绍二</h3>
                <p>全面梳理并实时扩充资本市场法律法规、行业政策，借助于金融领域专家的经验进行跨市场、跨领域横向纵向细分，提供精准智能的条文搜索，覆盖资本市场、国资监管、财务税收、跨境业务、行业法规等20多个专题、超过10000部法规。</p>
            </div>       
                 <img  class= "block-img" src="../images/error-401.svg" alt="">

        </div>
        <div class="block">
            <img  class= "block-img" src="../images/error-401.svg" alt="">
            <div class="block-txt">
                <h3>功能介绍三</h3>
                <p>全面梳理并实时扩充资本市场法律法规、行业政策，借助于金融领域专家的经验进行跨市场、跨领域横向纵向细分，提供精准智能的条文搜索，覆盖资本市场、国资监管、财务税收、跨境业务、行业法规等20多个专题、超过10000部法规。</p>
            </div>
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
