<template>
  <div class="container" @touchmove.stop.prevent @scroll.stop.prevent>
    <div class="backContent" @click.stop>
      <p class="theSelect"><span class="close" @click="goBack"></span>{{selectMain}}</p>
      <ul class="mainList" @scroll.stop @touchmove.stop>
        <li v-for="(item, index) in list" class="itemList" :class="index === selectIndex ? 'addColor' : ''" @click="getThen(index)">{{item.label}}</li>
      </ul>
      <div class="secondList" v-if="show" @click.stop.prevent @scroll.stop.prevent @touchmove.stop.prevent>
        <ul class="secondItemList" @scroll.stop @touchmove.stop>
          <li v-for="(item, index) in more" class="secondItem" @click="selectValue(index)">{{item.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list'],
  data () {
    return {
      more: [],
      show: false,
      selectMain: '',
      selected: '',
      selectIndex: ''
    }
  },
  created () {
    this.selectMain = '选择地区'
  },
  methods: {
    goBack () {
      this.$parent.showSelectCity = false
      this.$parent.showBackground = false
      document.body.style.overflow = 'visible'
    },
    getThen (index) {
      this.selectIndex = index
      this.show = true
      this.more = this.list[index].children
      let me = this.$parent
      let label = this.list[index].label
      let value = this.list[index].value
      me.provinceId = value
      this.selected = label
    },
    selectValue (index) {
      let me = this.$parent
      let label = this.more[index].label
      let value = this.more[index].value
      me.distPlace = this.selected + ' ' + label
      me.cityId = value
      me.showSelectCity = false
      me.showBackground = false
      document.body.style.overflow = 'visible'
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
  .secondList{
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    top: 38px;
    right: 0;
    z-index: 800;
    color: #333;
    background: #f5f5f5;
    border-left: 1px solid #f5f5f5;
  }
  .secondItemList{
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    background: #fff;
    margin-top: 10px;
    z-index: 800;
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
  .secondItem{
    position: relative;
    font-size: 14px;
    height: 40px;
    padding-left:10px;
    line-height: 40px;
    background: #fff;
  }
  .addColor{
    color: #1671E5;
  }
  .secondItem:before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #eee;
  }
</style>
