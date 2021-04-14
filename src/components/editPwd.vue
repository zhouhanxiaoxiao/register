<template>
  <div style="width: 100%;height: 90vh">
    <div class="login-container">
      <img src="../assets/login.png" style="width: 80%;margin-top: 10px">
      <Divider/>
      <Form ref="formValidate"
            @keyup.enter="handleSubmit('formValidate')"
            style="width: 90%;margin-left: 5%;"
            :model="user" :rules="rules" :label-width="80">
        <FormItem prop="email" style="">
          <label slot="label">{{ $t("user.email") }}</label>
          <i-input v-model="user.email" placeholder="Enter your CIBR or NIBS email"></i-input>
        </FormItem>
        <FormItem prop="password" style="">
          <label slot="label">{{ $t("user.newPwd") }}</label>
          <i-input type="password" v-model="user.password" placeholder="Enter your password"></i-input>
        </FormItem>
        <FormItem prop="repeatPwd" style="">
          <label slot="label">{{ $t("user.repeatPwd") }}</label>
          <i-input type="password" v-model="user.repeatPwd" placeholder="Confirm your password"></i-input>
        </FormItem>
        <FormItem prop="validate" style="">
          <label slot="label">{{ $t("user.validate") }}</label>
          <i-input v-model="user.validate" placeholder="Enter confirmation code" style="width: 50%"></i-input>
          <Tooltip :content="$t('user.getCode')" placement="top" style="width: 50%;">
            <Button @click="getCode"
                    :disabled="codeDiabled"
                    style="display: inline-block; margin-left: -20px;
                    overflow: hidden;text-overflow:ellipsis;white-space:nowrap;">
              {{ codeText }}
            </Button>
          </Tooltip>
        </FormItem>
        <FormItem>
          <div style="width: 100%;text-align: left;margin-bottom: 50px">
            <i-button type="primary" class="submitUser"
                      @click="handleSubmit('formValidate') ">{{ $t("save") }}
            </i-button>
            <Button @click="handleReset('formValidate')"
                    style="margin-left: 8px">{{ $t("reset") }}
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import util from "@/components/public/util";

export default {
  name: "editPwd",
  data : function (){
    var _this = this;
    const validatePassCheck = (rule, value, callback) => {
      if (value !== _this.user.password) {
        callback(new Error(_this.$t("user.notSamePwd")));
      } else {
        callback();
      }
    };
    const validateEmailCheck = (rule, value, callback) => {
      var reg = /^\w{3,}@cibr\.ac\.cn$/;
      var regnibs = /^\w{3,}@nibs\.ac\.cn$/;
      if (!reg.test(_this.user.email) && !regnibs.test(_this.user.email)) {
        callback(new Error(_this.$t("user.errEmail")));
      } else {
        callback();
      }
    };
    return {
      user: {
        email: "",
        password: "",
        repeatPwd: "",
        validate: "",
      },
      rules: {
        email: [
          {required: true, message: this.$t("user.noEmail"), trigger: 'blur'},
          {validator: validateEmailCheck, trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t("user.noPassword"), trigger: 'blur'},
          {type: 'string', min: 8, message: this.$t("user.lessLengthPwd"), trigger: 'blur'}
        ],
        repeatPwd: [
          {required: true, message: this.$t("user.noRepeatPwd"), trigger: 'blur'},
          {validator: validatePassCheck, trigger: 'blur'}
        ],
        validate: [
          {required: true, message: this.$t("user.noValidate"), trigger: 'blur'},
        ]
      },
      codeDiabled: false,
      codeText: this.$t("user.getCode"),
    }
  },
  methods : {
    handleReset(name) {
      //重置表单
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      //提交表单信息
      var _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.loading = true;
          _this.user.password = _this.$md5(_this.user.password);
          _this.user.repeatPwd = _this.$md5(_this.user.repeatPwd);
          _this.$axios.post("/register/editPassword", {user: JSON.stringify(_this.user)}).then(function (res) {
            _this.loading = false;
            if (res.data.code !== "success") {
              _this.$Message.error(_this.$t(res.data.code));
            } else {
              _this.$Message.success(_this.$t("commitSuccess"));
              setTimeout(function () {
                window.location.href = util.webCenter;
              }, 1000);
            }
          }).catch(function (res) {
            console.log(res);
            _this.loading = false;
            _this.$Message.error(_this.$t("err.systemErr"));
          });
        } else {
          _this.$Message.error(_this.$t("user.placeWrite"));
        }
      })
    },
    getCode: function () {
      //获取验证码
      if (this.user.email === "") {
        this.$Message.error(this.$t("user.noEmail"));
        return;
      }
      var reg = /^\w{3,}@cibr\.ac\.cn$/;
      var regnibs = /^\w{3,}@nibs\.ac\.cn$/;
      if (!reg.test(this.user.email) && !regnibs.test(this.user.email)) {
        this.$Message.error(this.$t("user.errEmail"));
        return;
      }
      var timeload = 60;
      var _this = this;
      this.loading = true;
      this.codeDiabled = true;
      var codeNum = setInterval(function () {
        timeload--;
        _this.codeText = timeload + _this.$t("user.reloadCode")
        if (timeload <= 0) {
          _this.codeText = _this.$t("user.getCode");
          _this.codeDiabled = false;
          clearInterval(codeNum);
        }
      }, 2000);
      this.$axios.post("/register/getCode", {email: this.user.email}).then(function (res) {
        _this.loading = false;
        if (res.data.code !== "success") {
          _this.$Message.error(_this.$t(res.data.code));
        } else {
          _this.$Message.success(_this.$t("user.sendCodeSuccess"))
        }
      }).catch(function (res) {
        console.log(res);
        _this.loading = false;
        _this.$Message.error(_this.$t("err.systemErr"));
      });
    },
  }
}
</script>

<style scoped>
.login-container {
  position: absolute;
  right: 37%;
  top: 10%;
  min-height: 50%;
  width: 25%;
  background-color: white;
  border-radius: 5px;
  font-size: 16px;
}
</style>