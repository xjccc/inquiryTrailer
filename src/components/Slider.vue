<template>
  <div class="container" @touchmove.stop.prevent @scroll.stop.prevent>
    <div class="backContent" @click.stop>
      <p class="theSelect"><span class="close" @click="goBack"></span>{{selectMain}}</p>
      <ul class="mainList" @scroll.stop @touchmove.stop>
        <li v-for="(item, index) in list" class="itemList" :class="index === selectIndex ? 'addColor' : ''" @click="chooseSelect(index)">{{item.name}}</li>
        <li class="itemList" v-if="!list.length">没有相关意向车型</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  data () {
    return {
      selectMain: '选择类别',
      selectIndex: ''
    }
  },
  methods: {
    goBack () {
      this.$parent.showSlider = false
      this.$parent.showBackground = false
      document.body.style.overflow = 'visible'
    },
    chooseSelect (index) {
      this.selectIndex = index
      this.$parent.carType = this.list[index].name
      this.$parent.carTypeId = this.list[index].id
      this.$parent.showSlider = false
      this.$parent.showBackground = false
    }
  }
}
</script>
<style scoped>
  .container{
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    width: 80%;
    background: #f5f5f5;
    display: flex;
    flex-direction: row-reverse;
    z-index: 500;
  }
  .backContent{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    z-index: 500;
  }
  .mainList{
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    margin-top: 10px;
    color: #333;
    background-color: #fff;
  }
  .itemList{
    position: relative;
    font-size: 14px;
    padding-left: 10px;
    line-height: 40px;
  }
  .itemList:before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #eee;
  }
  .theSelect{
    text-align: center;
    background-color: #fff;
    color: #333;
    padding: 10px;
    font-size:18px;
    line-height: 18px;
  }
  .close{
    color: #000;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
  }
  .close:before {
    content: '';
    position: absolute;
    top: 13px;
    width: 12px;
    height: 12px;
    border-left: solid 1px currentColor;
    border-top: solid 1px currentColor;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
  }
  .addColor{
    color: #1671E5;
  }
</style>
