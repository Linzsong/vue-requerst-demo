<template>
  <div>
    <p>该demo主要功能：</p>
    <p>请求封装、请求和响应拦截、令牌机制处理</p>
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @validate="validateHandler"
      @submit="submitHandler"
      @reset="resetHandler"
    ></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        username: "",
        password: ""
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                modelKey: "username",
                label: "用户名",
                props: {
                  placeholder: "请输入用户名"
                },
                rules: {
                  required: true
                },
                // validating when blur
                trigger: "blur"
              },

              {
                type: "input",
                modelKey: "password",
                label: "密码",
                props: {
                  type: "password",
                  placeholder: "请输入密码",
                  eye: {
                    open: true
                  }
                },
                rules: {
                  required: true
                },
                // validating when blur
                trigger: "blur"
              }
            ]
          },

          {
            fields: [
              {
                type: "submit",
                label: "submit (POST Request)"
              },
              {
                type: "reset",
                label: "reset (GET Request) "
              }
            ]
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      }
    };
  },
  methods: {
    async submitHandler(e) {
      //阻止表单的默认提交行为
      e.preventDefault();
      let query = {
        account: "200046",
        password: "123456"
      };
      await this.$store
        .dispatch("userModel_userlogin", {
          data: query,
          header: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          console.log("post调用返回结果：", res);
          if (res) {
            let toast = this.$createToast({
              time: 2000,
              txt: "登录成功",
              type: "correct"
            }).show();
            // const path = this.$route.query.redirectTo || "/";   //路由重定向跳转
            // this.$router.push(path);
          }
        })
        .catch(err => {
          let toast = this.$createToast({
            time: 2000,
            txt: err,
            type: "error"
          }).show();
        });
    },
    validateHandler(result) {},

    resetHandler(e) {
      this.getRequerst();
    },

    async getRequerst() {
      await this.$store.dispatch("userModel_getDate").then(result => {
        console.log("get调用返回结果：", result);
        this.$createToast({
          time: 2000,
          txt: "get请求成功",
          type: "correct"
        }).show();
      }).catch(err => {
        this.$createToast({
          time: 2000,
          txt: err,
          type: "error"
        }).show();
      })
    }
  }
};
</script>

<style>
</style>