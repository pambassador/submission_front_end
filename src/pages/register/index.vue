<template>
  <div class="main">
    <my-header>
    </my-header>
    <div class="container main-container">
      <!-- <div id="webValidation" class="alert alert-error">
        <i class="fa fa-exclamation-triangle"></i>
        <strong>Please filled the following req(s):</strong>
        <ul>
          <li>
            First (Given) Name is a required field
          </li>
        </ul>
      </div> -->
      <!-- <h1>Create An Account</h1>
      <p><span class="required">* </span> = Required Fields</p> -->
      <table cellpadding="0" cellspacing="0" class="tablelines" border="1">
        <tbody>
          <tr>
            <td class="headercells" colspan="3">
              <p class="pagecontents">
                <b>账号 / 密码</b>
              </p>
            </td>
          </tr>
          <tr>
            <td class="dataentry">
              <table border="0" cellpadding="3" cellspacing="0">
                <tbody>
                  <tr>
                    <td>
                      <field-input type="text" title="账号" :noMaxTip='1' :required='true' v-model="item.account">
                      </field-input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-input type="password" title="密码" :noMaxTip='1' :required='true' v-model="item.password">
                      </field-input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-input type="password" title="确认密码" :noMaxTip='1' :required='true' v-model="item.confirmPassword">
                      </field-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td class="headercells" colspan="3">
              <p class="pagecontents">
                <b>邮箱 / 姓名</b>
              </p>
            </td>
          </tr>
          <tr>
            <td class="dataentry">
              <table border="0" cellpadding="3" cellspacing="0">
                <tbody>
                  
                  <tr>
                    <td>
                      <field-input type="text" title="姓名" :noMaxTip='1' :required='true' v-model="item.username">
                      </field-input>
                    </td>
                  </tr>
                  
                  <tr>
                    <td>
                      <field-input type="email" title="邮箱" :noMaxTip='1' :required='true' v-model="item.email">
                      </field-input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-select title='称谓' :required='true' v-model='item.prefix' :list='meta.prefix'>
                      </field-select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-select title='学位' v-model='item.degree' :list='meta.degree'>
                      </field-select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td class="headercells" colspan="3">
              <p class="pagecontents">
                <b>地址</b>
              </p>
            </td>
          </tr>
          <tr>
            <td class="dataentry">
              <table border="0" cellpadding="3" cellspacing="0">
                <tbody>
                  <tr>
                    <td>
                      <field-select title='国家' :required='true' v-model='item.country' :list='meta.country' @change='clearCity'>
                      </field-select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-select title='城市' :required='true' v-model='item.city' :list=city>
                      </field-select>
                    </td>
                  </tr>
                  <tr>
                    <!--  <td align="RIGHT">
                      <p class="pagecontents">Postal Code:</p>
                    </td> -->
                    <td>
                      <field-input type="text" title="邮政编码" :noMaxTip='1' :required='true' v-model="item.postalCode">
                      </field-input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-input type="tel" title="电话" :noMaxTip='1' v-model="item.phone">
                      </field-input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <field-textarea title="详细地址" :required='true' v-model="item.address">
                      </field-textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="operate-button">
        <el-button id="resetPasswordLnk" type="primary" class="btn btn-primary pull-right" hidefocus="true" :disabled='!verify.isPass' v-on:click="registerData">
          提交 <i class="fa fa-check-square-o"></i>
        </el-button>
      </div>
    </div>
    <my-footer>
    </my-footer>
  </div>
</template>
<style lang="less" scoped>
.main-container {
  margin: 0 auto;
  width: 60%;
}

.tablelines {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
}

.headercells {
  background-color: #CCCCCC;
  padding-left: 10px;
}

.pagecontents {
  height: 20px;
  line-height: 20px;
}

table {
  display: table;
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
  margin: 10px;
  tbody {
    display: table-row-group;
    vertical-align: middle;
  }
  .dataentry {
    background-color: #F8F8F8;
    padding-left: 50px;
  }
}

.operate-button {
  margin-top: 30px;
}

.li-edit-item {
  line-height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
<script>
import mixin from "../../server/common.js"
import countryData from "../../server/countryData.js"
export default {
  mixins: [mixin],
  props: ['option'],
  data() {
    return {
      item: {
        account: '',
        password: '',
        confirmPassword: '',
        prefix: '',
        username: '',
        degree: '',
        email: '',
        country: '',
        city: '',
        address: '',
        postalCode: '',
        phone: '',
      },
      meta: {
        prefix: [{
          name: 'Dr.',
          id: 'Dr.'
        }, {
          name: 'Miss.',
          id: 'Miss.'
        }, {
          name: 'Mr.',
          id: 'Mr.'
        }, {
          name: 'Mrs.',
          id: 'Mrs.'
        }, {
          name: 'Ms.',
          id: 'Ms.'
        }, {
          name: 'Prof.',
          id: 'Prof.'
        }],
        degree: [{
            name: '学士',
            id: '学士'
          },
          {
            name: '硕士',
            id: '硕士'
          },
          {
            name: '博士',
            id: '博士'
          }
        ],
        country: countryData.Location.CountryRegion,
        cities: []
      },

      verifyFields: {
        account: {
          isRequired: true,
          verityFn: 'notNull'
        },
        password: {
          isRequired: true,
          verityFn: 'notNull'
        },
        confirmPassword: {
          isRequired: true,
          verityFn: 'notNull'
        },
        prefix: {
          isRequired: true,
          verityFn: 'notNull'
        },
        username: {
          isRequired: true,
          verityFn: 'notNull'
        },
        email: {
          isRequired: true,
          verityFn: 'notNull'
        },
        country: {
          isRequired: true,
          verityFn: 'notNull'
        },
        city: {
          isRequired: true,
          verityFn: 'notNull'
        },
        postalCode: {
          isRequired: true,
          verityFn: 'notNull'
        },
        address: {
          isRequired: true,
          verityFn: 'notNull'
        }
      },
    }
  },
  created() {

  },
  computed: {
    city: function() {
      var cities = [{ name: '空', id: '0' }];
      var self = this;
      countryData.Location.CountryRegion.forEach(function(value) {
        if (value.name == self.item.country) {
          if (value.State) {
            cities = value.State.City || value.State;
          }
        }
      });
      this.meta.cities = cities;
      return cities;
    }

  },
  methods: {
    clearCity() {
      this.item.city = '';
    },
    registerData() {
      var data = {
        account: this.item.account,
        password: this.item.password,
        prefix: this.item.prefix,
        username: this.item.username,
        degree: this.item.degree,
        email: this.item.email,
        country: this.item.country,
        city: this.item.city,
        postalCode: this.item.postalCode,
        phone: this.item.phone,
        address: this.item.address
      };
      let cbk = (res) => {
        if (res.code == 200) {
          this.$alert('点击确认进入登陆页面', '注册成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ path: '/login' });
          }
        });
          
        }
      };
      this.accessUtil(data, cbk, null, 'api/user');
    }
  },
}

</script>
