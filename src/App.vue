<template>
  <div id="inquiryTra">
    <div class="background" @click="goBack" v-show="showBackground">
    </div>
    <header class="main headTitle" v-if="showHeaderTitle">
      <p class="title">询底价</p>
      <!-- <span class="close" @click="goBack"></span> -->
    </header>
    <header class="main title-desc">提交询价将有挂车业务员为您服务</header>
    <div class="content-bottom">
      <ul class="main content">
        <li class="li content-text">
          <label class="label asterisk">选择车型</label>
          <p class="select" @click="selectCarType">{{carType}}</p>
        </li>
        <li class="user-content">
          <input type="text" class="input" v-model="name" placeholder="您的称呼" placeholder-style="color:#999" style="font-size:14px;color:#333;letter-spacing:0;line-height:14px;padding-left:30px;" @focus="focuName" :class="addNameBorder ? 'input-border' : ''" @blur="blurName" />
          <div class="second-input">
            <input type="text" class="phone-input" v-model="phone" placeholder="您的手机号"
            placeholder-style="color:#999" style="font-size:14px;color:#333;letter-spacing:0;line-height:14px;padding-left:30px;" maxlength="11" @focus="focuPhone" :class="addPhoneBorder ? 'input-border' : ''" @blur="blurPhone" />
            <span class="second-asterisk">*</span>
          </div>
        </li>
        <li class="li content-text">
          <label class="label asterisk">提车地区</label>
          <p class="select" @click="dist">{{distPlace}}</p>
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
            <input type="radio" id="yes" value="1" v-model="picked" />
            <label class="chooseLabel" for="yes">是</label>
            <input class="cicle-no" type="radio" id="no" value="0" v-model="picked" />
            <label class="chooseLabel" for="no">否</label>
          </div>
        </li>
        <li class="li remark-content">
          <label class="label remark">备注</label>
          <div class="remark-textarea">
            <textarea class="textarea" v-model="textarea" placeholder="挂车属于定制性产品，请详细填写所需产品的特殊需求和用途，如（型号，用途，规格）" placeholder-style="color:#999" maxlength="300" @input="textInput"></textarea>
            <span class="fontNum">{{fontNum}}/300</span>
          </div>
        </li>
      </ul>
      <label for="tick" class="main personal-statement">
        <input type="checkbox" class="tick" id="tick" value="" v-model="tick" />
        <p class="personal-agree">我同意<span class="agree" @click="showPersonPro">《个人信息保护声明》</span></p>
      </label>
    </div>
    <div class="freeGetInquiry" @click="getInquiry" :class="canClick ? 'freeGetInquiryBack' : ''">免费获取最低价</div>
    <transition name="slide">
      <slider v-if="showSlider" :list="carData"></slider>
      <select-city v-if="showSelectCity" :list="cityData"></select-city>
      <personal-protect v-if="showProtect"></personal-protect>
    </transition>
    <tips :textTip="textTip" v-if="closeTheTip"></tips>
  </div>
</template>

<script>
import stream from './util/stream.js'
import Slider from './components/Slider.vue'
import Tips from './components/Tips.vue'
import SelectCity from './components/SelectCity.vue'
import PersonalProtect from './components/PersonalProtect.vue'
export default {
  components: {
    Slider,
    Tips,
    SelectCity,
    PersonalProtect
  },
  data () {
    return {
      showHeaderTitle: true,
      name: '',
      phone: '',
      picked: '0',
      textarea: '',
      fontNum: 0,
      tick: true,  // 同意个人保护信息
      showSlider: false, // 弹出选择车辆类型
      showBackground: false,
      carType: '请选择',  // 车辆类型
      cartypeId: '',
      carData: [],
      cityData: [],
      distPlace: '请选择',
      provinceId: '',
      cityId: '',
      addNameBorder: false, // 添加边框
      addPhoneBorder: false,
      count: 1,
      cut: true,  // 添加样式
      add: false,
      textTip: '',  // 提示内容
      closeTheTip: false,   // 关闭提示
      showSelectCity: false,
      showProtect: false,    // 显示个人信息保护
      canClick: false
    }
  },
  created () {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      this.showHeaderTitle = false
    }
    this.getLocations()
    this.getCarType()
    this.getCities()
  },
  methods: {
    getLocations () {  // 定位城市
      stream('get', 'https://dealer-api.360che.com/Dealer/getLocation.aspx', {}, (res) => {
        if (res.isok === '1') {
          this.distPlace = res.cityname
          this.provinceId = res.provincesn
          this.cityId = res.citysn
        }
      })
    },
    goBack () {  // 顶部返回键
      this.showSlider = false
      this.showBackground = false
      this.showSelectCity = false
      document.body.style.overflow = 'visible'
    },
    textInput () {  // 显示字数
      this.fontNum = this.textarea.length
    },
    getCarType () {
      stream('get', 'http://api.dealer.360che.com/Dealer/getProdcutSubCategory.aspx?cid=' + `${14}`, {}, (res) => {
        this.carData = res
      })
    },
    getCities () {
      stream('get', 'https://dealer-api.360che.com/Dealer/getProvinceCity.aspx', {}, (res) => {
        this.cityData = res.data
      })
    },
    selectCarType () { // 选择车辆类型
      this.showSlider = true
      this.showBackground = true
      document.body.style.overflow = 'hidden'
    },
    dist () {
      this.showSelectCity = true
      this.showBackground = true
      document.body.style.overflow = 'hidden'
    },
    getInquiry () { // 获取最低价
      if (!this.canClick) return
      if (!this.carTypeId) {
        this.textTip = '请选择车型'
        this.closeTheTip = true
      } else if (!this.cityId) {
        this.textTip = '请选择提车地区'
        this.closeTheTip = true
      } else if (!this.tick) {
        this.textTip = '请同意个人信息保护声明'
        this.closeTheTip = true
      } else {
        var options = {
          relname: this.name,
          tel: this.phone,
          categoryid: 14,
          subcategoryid: this.carTypeId,
          provincesn: this.provinceId,
          citysn: this.cityId,
          clueresource: 6,
          buycount: this.count,
          isold: this.picked,
          remark: this.textarea
        }
        stream('get', 'https://dealer-api.360che.com/Dealer/submitDealerClues.aspx?', options, (res) => {
          if (res.isok === 1) {
            this.textTip = '询价成功，稍后会有经销商与您取得联系'
            this.closeTheTip = true
          } else {
            this.closeTheTip = true
            this.textTip = res.result
          }
        })
      }
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
      var phone = this.phone
      if (!phone || !phone.match(/1(([38]\d)|(4[57])|(5[012356789])|(7[013678]))\d{8}/g)) {
        this.textTip = '请输入正确的手机号码'
        this.closeTheTip = true
      } else {
        this.canClick = true
      }
    },
    cutNum () {
      if (this.count <= 2) {
        this.cut = true
        this.add = false
        this.count = 1
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
      this.showProtect = true
    }
  }
}
</script>

<style scoped>
  #inquiryTra{
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
  }
  .background{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 50;
  }
  .content-bottom{
    margin-bottom: 60px;
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
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
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
    margin-left: 25px;
  }
  .chooseLabel{
    position: relative;
    width: 20px;
    margin-left: 15px;
    font-size: 14px;
    color: #333;
  }
  .content input[type="radio"] + .chooseLabel:before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    margin-left: -20px;
    margin-top: 14px;
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
    height: 10px;
    left: 0;
    top: 50%;
    margin-left: -17px;
    margin-top: -5px;
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
    padding-top: 10px;
    padding-right: 15px;
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
    top:0;
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
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    background: #ddd;
    text-align: center;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
    z-index: 16;
  }
  .freeGetInquiryBack{
    background: #FF6600;
  }
  .slide-enter-active, .slide-leave-active {
    transition: transform .2s linear;
    transform: translate3d(0, 0, 0);
  }
  .slide-enter, .slide-leave-active {
    transform: translate3d(100%, 0, 0);
    transition: transform .2s linear;
  }
</style>
