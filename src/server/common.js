import lib from './util.js'
import fieldInput from "../components/fieldInput"
import fieldTextarea from "../components/fieldTextarea"
import fieldSelect from "../components/fieldSelect"
import fieldFile from "../components/fieldFile"

const mixin = {
  created() {

  },
  data() {
    return {
      item: {},
      meta: {},
      verifyFields: {},
    }
  },
  computed: {
    verify() {
      return this.verifyFn();
    },
  },
  methods: {
    // getCookie(cname) {
    //   var name = cname + "=";
    //   var ca = document.cookie.split(';');
    //   console.log('ca' + ca);
    //   for (var i = 0; i < ca.length; i++) {
    //     var c = ca[i].trim();
    //     if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    //   }
    //   return "";
    // },
    accessUtil(data, cbk1, cbk2, url, type, async) {
      var self = this;
      $.ajax({
        url: this.GLOBAL.serverSrc + url,
        async: async === "false" ? false : true || true,
        type: type || 'POST',
        data: data,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success(res) {
          if (res.code == 200 && res.success == true) {
            // console.log(res.message);
            // console.log('try' + document.cookie);
            // var x = self.getCookie('userId');
            // console.log(x);
            // var name = "userId=";
            // var ca = document.cookie.split(';');
            // for (var i = 0; i < ca.length; i++) {
            //   var c = ca[i].trim();
            //   if (c.indexOf(name) == 0)
            //     var x = c.substring(name.length, c.length);
            //     console.log(x);
            // };
            cbk1(res);

          } else {
            console.log(res.success)
            self.$msgbox({
              title: '错误',
              message: res.message || '数据操作错误',
              confirmButtonText: '确定',
            });
          }
        },
        error: cbk2 || function() {
          console.log('oh');
          self.$msgbox({
            title: '错误',
            message: '操作错误',
            confirmButtonText: '确定',
          });
        }
      });
    },

    verifyFn() {
      let ret = {};
      let item = this.item;
      let verifyFn = lib.verifyFn;
      let verifyFields = this.verifyFields;

      let isPass = true;
      for (let key in verifyFields) {
        let meta = verifyFields[key];
        let value = item[key];
        let fn = verifyFn[meta.verityFn];
        let isNull = !verifyFn.notNull(value);
        if (meta.isRequired) {
          // 必填项校验
          if (isNull) {
            ret[key] = false;
          } else {
            ret[key] = fn && fn(value);
          }
        } else {
          // 非必填项校验
          if (isNull) {
            ret[key] = true;
          } else {
            ret[key] = fn && fn(value);
          }
        }
        if (!ret[key] && isPass) {
          isPass = false;
        }
      }
      ret.isPass = isPass;
      return ret;
    },
    verifyEmail(value) {
      let isEmail = true;
      let verifyFn = lib.verifyFn;
      if (!verifyFn.isEmail(value)) {
        isEmail = false;
      }
      return isEmail;
    },
    verifyPassword(value, anothervalue) {
      let ret = {};
      let isPass = true;
      let isPassword = true;
      let isEqual = true;
      let verifyFn = lib.verifyFn;
      if (!verifyFn.isPassword(value)) {
        isPassword = false;
        isPass = false;
      } else if(value.trim() !== anothervalue.trim()) {
        isPass = false;
        isEqual = false;
        isPassword = true;
      } else {
        isPass = true;
        isEqual = true;
        isPassword = true;
      }
      ret.isPass = isPass;
      ret.isPassword = isPassword;
      ret.isEqual = isEqual;
      return ret;
    },
  },
  components: {
    fieldInput,
    fieldTextarea,
    fieldSelect,
    fieldFile
  },
};
export default mixin;
