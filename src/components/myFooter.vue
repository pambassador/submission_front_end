<template>
  <footer class="my-footer">
    <div class="container">
      <div class="footer-top">
        <a href="https://clarivate.com/products/scholarone/" target="_blank" hidefocus="true"><img src="../assets/logo_scholarone_white_2018.png" class="img-left" alt="ScholarOne logo">
        </a>
        <a href="http://clarivate.com" target="new" hidefocus="true">
          <img src="../assets/crv_logo_rgb_wht.png" class="img-right" alt="Clarivate Analytics logo">
        </a>
      </div>
    </div>
    <div class="container">
      <div class="footer-info">
        <p>
          <a class="footer-link" href="https://clarivate.com/legal/copyright/" target="new" hidefocus="true">
            ©Clarivate Analytics</a>
          <span class="ca_copyright">
            ©ScholarOne, Inc., 2018.
          </span>
        </p>
      </div>
    </div>
  </footer>
</template>
<style lang="less" scoped>
.my-footer {
  position: absolute;
  bottom: 0px;
  height: 100px;
  clear: both;
  width: 100%;
  min-width: 600px;
  padding: 10px 0px 50px;
  border-top: 1px solid #000;
  background-color: #333;
  background-attachment: scroll;
  background-image: linear-gradient(to bottom, rgb(80, 80, 80) 0%, rgb(44, 44, 44) 100%);
  background-repeat: repeat;
  color: #CCC;
  font-size: 14px;
  line-height: 20px;
  .img-right {
    float: right;
    width: 200px;
    clear: both;
  }
  .footer-link {
    color: #FFF;
  }
}
</style>

<script>
    export default {
    }
</script>