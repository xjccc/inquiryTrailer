<template>
  <div class="background">
    <div class="content">
      <p class="content-text">{{textTip}}</p>
      <p class="know" @click="close">知道了</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['textTip'],
  methods: {
    close () {
      this.$parent.closeTheTip = false
    }
  }
}
</script>
<style scoped>
  .background{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 60;
  }
  .content{
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 240px;
    height: 124px;
    margin-left: -120px;
    margin-top: -62px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    z-index: 100;
  }
  .content-text{
    display: flex;
    padding:16px 15px 15px 16px;
    border-bottom: 1px solid #eee;
    flex:1;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333333;
    line-height: 24px;
    word-wrap: break-word;
  }
  .know{
    height: 43px;
    font-size: 16px;
    line-height: 43px;
    color: #1571E5;
  }
</style>
