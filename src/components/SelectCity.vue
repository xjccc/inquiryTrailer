<template>
  <div class="select-location">
    <div class="backContent" @click.stop>
      <p class="theSelect"><span class="close" @click="goBack"></span>{{selectMain}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectMain: ''
    }
  },
  methods: {
    goBack () {

    }
  }
}
</script>
<style scoped>
  .select-location{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    z-index: 150;
  }
  .backContent{
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    width: 80%;
    height: 100%;
    background: #f5f5f5;
    z-index: 500;
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
  .theSelect{
    text-align: center;
    background-color: #fff;
    color: #333;
    padding: 10px;
    font-size:18px;
    line-height: 18px;
  }
</style>
