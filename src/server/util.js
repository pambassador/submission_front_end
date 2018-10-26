const utils = {
  // accessUtil: function(data, cbk1, cbk2, url) {
  //   $.ajax({
  //     url: url,
  //     type: 'POST',
  //     data: data,
  //     dataType: 'json',
  //     success(res) {
  //       if (res.code == 200 && res.success == true) {
  //         console.log("success");
  //         cbk1(res);
  //       } else {
  //         console.log('error')
  //         alert({
  //           title: '错误',
  //           text: res.message || '数据操作错误'
  //         });
  //       }
  //     },
  //     error: cbk2 || function() {
  //       console.log('oh')
  //       alert({
  //         title: '错误',
  //         text: '数据操作错误'
  //       });
  //     }
  //   });
  // },
  verifyFn: {
    notNull: function(str) {
      str = str ? str + '' : '';
      return !!str.trim();
    },
    isNumber: function(str) {
      str = str ? str + '' : '';
      return !!str.trim().match(/^\d+$/);
    },
    isUserName: function(str) {
      str = str ? str + '' : '';
      return !!str.trim().match(/^[a-zA-Z]\w*$/ig);
    },
    isEmail: function(str) {
      str = str ? str + '' : '';
      return !!str.trim().match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
    },
    isPassword: function(str) {
      str = str ? str + '' : '';
      return !!str.trim().match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/); //8到16位数字与字母组合
    },
    isFloat: function(str) {
      str = str ? str + '' : '';
      return !!str.trim().match(/^\d+\.\d+$/);
    },
    isEnWords: function(str) {
      str = str ? str + '' : '';
      return !!str.trim().match(/^\w+$/);
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e)
        return !1;
      return !0
    },
    notEmptyList: function(e) {
      return !!e.length;
    },
    noop: function() {
      return 1;
    },
  },
}
export default utils;
