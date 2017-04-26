<template>
  <div id="inquiryTra" :style="`height:${height}px`">
    <header class="main headTitle">
      <p class="title">询底价</p>
      <span class="close" @click="goBack"></span>
    </header>
    <header class="main title-desc">提交询价将有挂车业务员为您服务</header>
    <ul class="main content">
      <li class="li content-text" @click="selectCarType">
        <label class="label asterisk">选择车型</label>
        <p class="select">{{carType}}</p>
      </li>
      <li class="user-content">
        <input type="text" class="input" v-model="name" placeholder="您的称呼" placeholder-style="color:#999" style="font-size:14px;color:#333;letter-spacing:0;line-height:14px;padding-left:30px;" @focus="focuName" :class="addNameBorder ? 'input-border' : ''" @blur="blurName" />
        <div class="second-input">
          <input type="text" class="phone-input" v-model.number="phone" placeholder="您的手机号"
          placeholder-style="color:#999" style="font-size:14px;color:#333;letter-spacing:0;line-height:14px;padding-left:30px;" maxlength="11" @focus="focuPhone" :class="addPhoneBorder ? 'input-border' : ''" @blur="blurPhone" />
          <span class="second-asterisk">*</span>
        </div>
      </li>
      <li class="li content-text">
        <label class="label asterisk">提车地区</label>
        <p class="select">请选择</p>
      </li>
      <li class="li buyCount">
        <label class="label">购车数量</label>
        <div class="num-change">
          <span class="operator" @click="cutNum" :class="cut ? 'cut' : ''">-</span>
          <span class="number">{{count}}</span>
          <span class="operator" @click="addNum" :class="add ? 'add' : ''">+</span>
        </div>
      </li>
      <li class="li buyCount">
        <label class="label">以旧换新</label>
        <div class="chooseYN">
          <input type="radio" id="yes" value="yes" v-model="picked" />
          <label class="chooseLabel" for="yes">是</label>
          <input class="cicle-no" type="radio" id="no" value="no" v-model="picked" />
          <label class="chooseLabel" for="no">否</label>
          <span class="span"></span>
        </div>
      </li>
      <li class="li remark-content">
        <label class="label remark">备注</label>
        <div class="remark-textarea">
          <textarea class="textarea" v-model="textarea" placeholder="挂车属于定制性产品，请详细填写所需产品的特殊需求和用途，如（星号，用途，规格）" placeholder-style="color:#999" maxlength="300" @input="textInput"></textarea>
          <span class="fontNum">{{fontNum}}/300</span>
        </div>
      </li>
    </ul>
    <label for="tick" class="main personal-statement">
      <input type="checkbox" class="tick" id="tick" value="tick" v-model="tick" />
      <p class="personal-agree">我同意<span class="agree" @click="showPersonPro">《个人信息保护声明》</span></p>
    </label>
    <div class="freeGetInquiry" @click="getInquiry">免费获取最低价</div>
    <transition name="fade">
      <slider v-if="showSlider"></slider>
      <!-- <select-city></select-city> -->
    </transition>
    <tips :textTip="textTip" v-if="closeTheTip"></tips>
  </div>
</template>

<script>
import Slider from './components/Slider.vue'
import Tips from './components/Tips.vue'
import SelectCity from './components/SelectCity.vue'
export default {
  components: {
    Slider,
    Tips,
    SelectCity
  },
  data () {
    return {
      height: '',
      name: '',
      phone: '',
      picked: 'no',
      textarea: '',
      fontNum: 0,
      tick: '',
      showSlider: false, // 弹出选择车辆类型
      carType: '请选择',  // 车辆类型
      addNameBorder: false, // 添加边框
      addPhoneBorder: false,
      count: 1,
      cut: true,  // 添加样式
      add: false,
      textTip: '请输入正确的手机号码',  // 提示内容
      closeTheTip: false   // 关闭提示
    }
  },
  created () {
    this.height = document.documentElement.clientHeight
  },
  methods: {
    goBack () {  // 返回键
    },
    textInput () {  // 显示字数
      this.fontNum = this.textarea.length
    },
    selectCarType () { // 选择车辆类型
      this.showSlider = true
      document.body.style.overflow = 'hidden'
    },
    getInquiry () { // 获取最低价

    },
    focuName () {
      this.addNameBorder = true
    },
    blurName () {
      this.addNameBorder = false
    },
    focuPhone () {
      this.addPhoneBorder = true
    },
    blurPhone () {
      this.addPhoneBorder = false
    },
    cutNum () {
      if (this.count <= 2) {
        this.count = 1
        this.cut = true
        this.add = false
      } else {
        this.count = this.count - 1
        this.cut = false
        this.add = false
      }
    },
    addNum () {
      if (this.count >= 98) {
        this.add = true
        this.cut = false
        this.count = 99
      } else {
        this.count = this.count + 1
        this.add = false
        this.cut = false
      }
    },
    showPersonPro () {  // 点击个人声明
      console.log(1)
    }
  }
}
</script>

<style scoped>
  #inquiryTra{
    overflow: auto;
    -webkit-overflow-scrolling:touch;
  }
  .main{
    background: #fff;
  }
  .headTitle{
    position: relative;
    width: 100%;
    height: 44px;
  }
  .title{
    color: #333;
    text-align: center;
    font-size: 18px;
    line-height: 44px;
  }
  .close{
    color: #000;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 44px;
  }
  .close:before {
    content: '';
    position: absolute;
    left: 15px;
    top: 16px;
    width: 12px;
    height: 12px;
    color: #BBB;
    border-left: solid 1px currentColor;
    border-top: solid 1px currentColor;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
  }
  .title-desc{
    background: #ffa366;
    color: #fff;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    padding: 0;
    text-align: center;
  }
  .title-desc:before{
    content: '';
    background: url(https://s.kcimg.cn/wap/images/detail/aircraft.png) 50% 50%;
    width: 14px;
    height: 12px;
    display: inline-block;
    background-size: cover;
    margin-right: 5px;
    margin-bottom: -2px;
  }
  .content{
    list-style: none;
    position: relative;
  }
  .li{
    display: flex;
    flex-direction: row;
    height: 44px;
    line-height: 44px;
    letter-spacing: 0;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  .content-text{
    position: relative;
  }
  .content-text:after{
    content: '';
    position: absolute;
    right:15px;
    top: 15px;
    width: 8px;
    height: 8px;
    color: #ddd;
    border-bottom: solid 2px currentColor;
    border-right: solid 2px currentColor;
    -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
  }
  .label{
    color: #333333;
    padding-left: 20px;
    padding-right: 15px;
    text-align: center;
  }
  .asterisk:before{
    content: "*";
    color: #FF6600;
    margin-right: 2px;
    margin-left: -8px;
    vertical-align: middle;
  }
  .select{
    flex:1;
    font-size: 14px;
    color: #999;
  }
  .user-content{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eee;
  }
  .content .input{
    border: 1px solid #ddd;
    background: #f5f5f5;
    height: 48px;
    margin: 15px 15px 0 15px;
  }
  .content .second-input{
    position: relative;
    margin:15px;
  }
  .phone-input{
    border: 1px solid #ddd;
    background: #f5f5f5;
    height: 48px;
    width: 100%;
  }
  .second-asterisk{
    position: absolute;
    width: 8px;
    height: 14px;
    line-height: 14px;
    left: 10px;
    top: 19px;
    color: #FF6600;
  }
  .content .input-border{
    border-color: #FF6600;
    background: #FFF8F4;
  }
  .num-change{
    display: flex;
    flex-direction: row;
    flex:1;
    margin-top: 7px;
    color: #666;
    line-height: 28px;
    text-align: center;
  }
  .operator{
    width: 28px;
    height: 28px;
    border: 1px solid #e5e5e5;
    background: #F9F9F9;
    color: #666;
    font-size: initial;
    z-index: 15;
  }
  .cut{
    color: #ccc;
  }
  .add{
    color: #ccc;
  }
  .number{
    width: 53px;
    height: 28px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .chooseYN{
    display: flex;
    flex-direction: row;
    flex:1;
  }
  .cicle-no{
    margin-left: 40px;
  }
  .chooseLabel{
    position: relative;
    font-size: 14px;
    color: #333;
  }
  .content input[type="radio"] + .chooseLabel:before{
    content: "";
    display: inline-block;
    margin-right: 5px;
    margin-top: -2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #F9F9F9;
    border: 1px solid #E5E5E5;
    vertical-align: middle;
  }
  .content input[type="radio"]:checked + .chooseLabel:before{
    content: "";
    border: 1px solid #FF6600;
  }
  .content input[type="radio"]:checked + .chooseLabel:after{
    position: absolute;
    content: "";
    width: 10px;
    left: 0;
    top: 50%;
    margin-left: 3px;
    transform: translateY(-50%);
    height: 10px;
    border-radius: 50%;
    border-color: #FF6600;
    background: #FF6600;
  }
  .remark-content{
    height: 138px;
  }
  .remark{
    padding-left: 48px;
  }
  .remark-textarea{
    display: flex;
    flex-direction: column;
    flex:1;
  }
  .textarea{
    outline:none;
    resize: none;
    font-size: 14px;
    color: #333;
    letter-spacing: 0;
    line-height: 21px;
    height: 100px;
  }
  .fontNum{
    margin-top: 5px;
    margin-right: 15px;
    align-self: flex-end;
    font-size: 12px;
    color: #999;
    letter-spacing: 0;
    line-height: 12px;
  }
  .personal-statement{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    height: 44px;
  }
  .tick{
    width: 43px;
    z-index: 20;
  }
  .personal-statement input[type="checkbox"] + .personal-agree:before{
    content: "";
    margin-left: -28px;
    margin-top: 13px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #F9F9F9;
    border: 1px solid #E5E5E5;
    vertical-align: middle;
  }
  .personal-statement input[type="checkbox"]:checked + .personal-agree:before{
    content: "";
    margin-left: -28px;
    margin-top: 13px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-color: #FF6600;
    background: #FF6600;
  }
  .personal-statement input[type="checkbox"]:checked + .personal-agree:after{
    position: absolute;
    left: 0;
    content: "";
    color: #fff;
    margin-left: -26px;
    margin-top: 16px;
    width: 12px;
    height: 6px;
    border-bottom: solid 1px currentColor;
    border-left: solid 1px currentColor;
    -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
  }
  .personal-agree{
    position: relative;
    flex: 1;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 44px;
  }
  .personal-agree:before{
    position: absolute;
  }
  .personal-agree .agree{
    color: #1571e5;
    z-index: 15;
  }
  .freeGetInquiry{
    margin-top: 10px;
    height: 49px;
    line-height: 49px;
    background: #FF6600;
    text-align: center;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
