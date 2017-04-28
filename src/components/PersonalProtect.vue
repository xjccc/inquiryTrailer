<template>
  <div class="information-module">
    <header class="headTitle">
      <p class="title">个人信息保护说明</p>
      <span class="close" @click="goBack"></span>
    </header>
		<div class="personal-information">
			<h4>1、用户须知</h4>
			<p>（1）北京卡车之家信息技术股份有限公司是处理通过本网站（简称“网站”）收集的所有个人信息的管理者。北京卡车之家信息技术股份有限公司尊重您的隐私，遵照中华人民共和国相关处理网络个人信息的规定来处理您的信息。<br>
			（2）本声明将介绍我们如何处理通过网站收集的所有个人信息，以及访问和更正这些个人信息的权利。<br>
			（3）北京卡车之家信息技术股份有限公司享有变更本声明的权利，这些变更信息在更改的声明发布时立即生效。建议您定期阅读声明，了解声明变更的情况。</p>

			<h4>2、个人信息的范围和收集</h4>
			<p>（1）我们收集您的个人信息的最终目的是为了向您提供更好的产品、服务，优化并丰富您的用户体验，这些个人信息系能够单独或者与其他信息结合识别您的个人身份的信息，包括：<br>
			 ①姓名<br>
			 ②移动电话<br>
			 ③您在网站的表格上输入的其他信息（电子邮箱、车牌号、住址等）<br>
			 ④在您上载到网站的内容中包含的任何个人信息<br>
			（2）以上个人信息均是您自愿提供。您有权拒绝提供，但如果您拒绝提供某些个人信息，您将可能无法使用我们提供的产品、服务，或者可能对您使用产品或服务造成一定的影响。<br>
			（3）对于不满 18 岁的用户，须在其法定监护人已经阅读本声明并且许可的情况下，通过网站提交个人信息。</p>

			<h4>3、个人信息的使用和披露</h4>
			<p>（1）您同意，北京卡车之家信息技术股份有限公司可以通过以下方式对个人信息进行使用和披露（包含对于个人信息的存储和处理）：<br>
			 ①我们（含分支机构）自行使用；<br>
			 ②我们向关联公司（包括但不限于北京卡车之家信息技术股份有限公司的附属公司、控股公司、联营公司等）披露并由其使用；<br>
			 ③我们向相关经销商、厂商及集团披露并由其使用；<br>
			 ④我们及关联公司及相关经销商、厂商为满足您的需求，通过您提供的信息与您联系；<br>
			 ⑤我们及关联公司及相关经销商、厂商会定期或不定期向您发送有关产品、服务或相关活动的信息，您同意接收上述信息。<br>
			（2）您同意免除上述个人信息的接收和/或使用方在按照本法律声明所述情形下进行信息披露和使用而导致的或可能导致的所有索赔、责任和损失。</p>

			<h4>4、更正或投诉</h4>
			<p>如果您需要查询、修改或更正您的个人信息，或对个人信息保护问题有任何疑问或投诉，您可以拨打电话 <span class="phone" @click="tel()">010-85788568</span> 联系我们。</p>
		</div>
	</div>
</template>
<script>
export default {
  methods: {
    goBack () {
      this.$parent.showProtect = false
    },
    tel () {
      window.location.href = 'tel://' + '010-85788568'
    }
  }
}
</script>
<style scoped>
  .information-module{
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
    z-index: 150;
  }
  .headTitle{
    position: relative;
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
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
    width: 10px;
    height: 10px;
    color: #BBB;
    border-left: solid 1px currentColor;
    border-top: solid 1px currentColor;
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
  }
  .personal-information{
    padding: 0 15px;
  }
  .personal-information h4 {
    font-size: 14px;
    color: #333;
    margin-bottom: 30px;
  }
  .personal-information p {
    line-height: 20px;
    font-size: 14px;
    color: #666;
    margin-bottom: 30px;
  }
  .information-module .phone {
    color: #FF6600;
  }
</style>
