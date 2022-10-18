<!-- eslint-disable no-dupe-else-if -->
<template>
  <div class="userreg">
    <div class="userlogin" @click="allFn">
      <div class="top">
        <div class="toptop">
          <!--  @get-a="fn" -->
          <!-- 登录 -->
          <div class="enter" :class="{ enterid: enterid }">
            <div class="top">
              <div class="close">
                <div>关闭</div>
              </div>
              <div class="logo">Logo</div>
            </div>
            <div class="center">
              <div class="user-center">
                <div class="tle">
                  <el-input
                    v-model="user.tel"
                    type="tel"
                    maxlength="11"
                    placeholder="手机号"
                  />
                </div>
                <div class="primary">
                  <el-input
                    v-model="user.passwd"
                    :type="password1"
                    placeholder="密码"
                  />
                  <div
                    :class="{ show: show1, boxshow: boxshow }"
                    @click="show"
                    data-pass="1"
                  >
                    显
                  </div>
                </div>
                <div class="botton">
                  <button @click="loginFn">登录</button>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="none-bottom">
                <div class="none-tel" @click="nonetel">手机号注册登录</div>
              </div>
            </div>
          </div>
          <!-- 注册 -->
          <div class="enter">
            <div class="top">
              <div class="close">
                <div class="fenhui" @click="fenhui">
                  <el-icon><DArrowLeft /></el-icon>返回
                </div>
              </div>
              <div class="logo">Logo</div>
            </div>
            <div class="center">
              <div class="user-center">
                <div class="tle">
                  <el-input
                    v-model="reg.tel1"
                    type="tel"
                    maxlength="11"
                    placeholder="手机号"
                  />
                </div>
                <div class="primary">
                  <el-input
                    v-model="reg.password1"
                    :type="password2"
                    placeholder="密码"
                  />
                  <div
                    :class="{ show: show1, boxshow: boxshow }"
                    @click="show"
                    data-pass="2"
                  ></div>
                </div>
                <div class="botton">
                  <el-input
                    :type="password3"
                    v-model="reg.confirmpasswd"
                    placeholder="确定密码"
                  />
                  <div
                    :class="{ show: show1, boxshow: boxshow }"
                    @click="show"
                    ref="dataNum"
                    data-pass="3"
                  ></div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="none-bottom">
                <div class="none-reg" @click="onSubmit">注册</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ huachu1: huachu1, huachu2: huachu2 }">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { userLogin, userReg } from "@/utils/api";
// import LoginView from '../components/LoginView.vue';
// import RegisterView from '../components/RegisterView.vue';
export default defineComponent({
  data() {
    return {
      huachu1: true, //弹出
      huachu2: false, //弹出
      boxshow: false,
      show1: true,
      password1: "password", //登录的密码
      password2: "password",
      password3: "password",
      enterid: false,
      msg: "", //划出框的内容
      user: {
        tel: "",
        passwd: "",
      },
      reg: {
        tel1: "",
        password1: "",
        confirmpasswd: "",
      },
    };
  },
  components: {},
  methods: {
    // 隐藏密码
    allFn() {
      // console.log(event);
      this.password1 = "password";
      this.password2 = "password";
      this.password3 = "password";
      this.boxshow = false;
    },
    // 显示密码
    show(event: Event) {
      event.stopPropagation();
      // console.log((event.target as HTMLElement).dataset.pass);
      // console.log(event);
      if ((event.target as HTMLElement).dataset.pass == "1") {
        console.log(1);
        this.boxshow = true;
        this.password1 = "text";
        // eslint-disable-next-line no-dupe-else-if
      } else if ((event.target as HTMLElement).dataset.pass == "2") {
        console.log(2);
        this.boxshow = true;
        this.password2 = "text";
      } else if ((event.target as HTMLElement).dataset.pass == "3") {
        console.log(3);
        this.boxshow = true;
        this.password3 = "text";
      }
    },
    // 返回登录页面，把登录页面宽度又设置回来
    fenhui() {
      this.enterid = !this.enterid;
    },
    // 点击手机注册时显示注册页面，把登录页面宽度设为零
    nonetel() {
      this.enterid = !this.enterid;
      // console.log("注册页面");
    },
    // fn({enterid}:{enterid:boolean}):void {
    //     console.log("成功",enterid);
    // },
    // 注册
    tiem() {
      this.huachu2 = true;
      setTimeout(() => {
        this.huachu2 = false;
      }, 2000);
    },
    onSubmit() {
      // 发起请求
      if (this.reg.tel1.length != 11) {
        // console.log(11);
        this.msg = "手机号不符合规则";
        this.tiem();
      } else if (this.reg.password1 != this.reg.confirmpasswd) {
        // console.log(222);
        this.msg = "密码不相同";
        this.tiem();
      } else {
        // console.log("注册");
        userReg(this.reg)
          .then((res) => {
            console.log(res.data.msg);
            this.msg = res.data.msg;
            if (res.data.code == -1) {
              console.log(res.data.msg); // 已经注册，密码错误
              // this.tiem();
              this.enterid = !this.enterid;// 返回登录页面
            } else if (res.data.code == 0) {
              console.log(res.data.msg); // 已经注册过了，请登录
              this.user.passwd = this.reg.password1;
              this.enterid = !this.enterid;// 返回登录页面
            } else {
              window.localStorage.setItem("uid",res.data.uid);
              this.$router.push({
                path:'/first'
              })
              console.log(res.data.msg); // 注册成功
              return;
            }
            this.user.tel = this.reg.tel1;
            this.tiem();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 登录
    loginFn() {
      if (this.user.tel.length != 11) {
        console.log(11);
        this.msg = "手机号不符合规则";
        this.huachu2 = true;
        this.tiem();
      } else {
        console.log("登录");
        userLogin(this.user)
          .then((res) => {
            console.log(res,111);
            this.msg = res.data.msg;
            if(res.data.code == 1){
              window.localStorage.setItem("uid",res.data.uid);
              this.$router.push({
                path:'/first'
              })
              return;
            }
            this.tiem();

          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.show {
  top: 0;
  left: 230px;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: aqua;
  text-align: center;
  line-height: 40px;
  display: block;
}
.boxshow {
  display: none;
}
.userreg {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/image/9907f20220923140808157.jpeg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  // 划出框
  .huachu1 {
    position: absolute;
    left: calc(50% - 150px);
    width: 300px;
    height: 120px;
    background-color: rgba(0, 255, 94, 0.906);
    border-radius: 15px;
    top: -150px;
    transition: all 0.6s;
    line-height: 120px;
    text-align: center;
    font-size: 14px;
  }
  .huachu2 {
    top: 10px;
  }

  .userlogin {
    width: 400px;
    height: 500px;
    background-color: #fff;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 7px solid rgba($color: #ffffff, $alpha: 0.5);
    // padding: 20px;
    // background-image: url(../assets/image/a3dcc20220721101349311.jpeg);
    //     background-size: cover;
    .top {
      width: 360px;
      height: 460px;
      //   background-color: chocolate;
      overflow: hidden;

      .toptop {
        width: 720px;
        height: 100%;
        // background-color: aliceblue;
        display: flex;

        .enterid.enter {
          width: 0;
          transition: all 0.2s;
        }
        .enter {
          width: 360px;
          height: 460px;
          //   background-color: rgba($color: #000000, $alpha: .5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.2s;
          .top {
            height: 90px;
            // background-color: pink;
            .close {
              height: 30px;
              //   background-color: red;
              .fenhui {
                float: left;
              }
              div {
                line-height: 30px;
                text-align: center;
                float: right;
                width: 80px;
                // background-color: darkturquoise;
              }
            }
            .logo {
              width: 100%;
              height: 60px;
              //   background-color: aliceblue;
              line-height: 60px;
              text-align: center;
              font-size: 30px;
            }
          }
          .center {
            // background-color: aqua;
            flex: 1;
            display: flex;
            justify-content: center;
            .user-center {
              width: 270px;
              // background-color: blueviolet;
              div {
                height: 40px;
              }
              .tle {
                margin-top: 10px;
                margin-bottom: 30px;
              }
              .primary {
                position: relative;
                margin-bottom: 30px;
              }
              .botton {
                position: relative;

                // background-color: brown;
                button {
                  border-radius: 6px;
                  font-size: 20px;
                  color: #fff;
                  width: 100%;
                  height: 100%;
                  background-color: black;
                }
              }
            }
          }
          .bottom {
            height: 160px;
            // background-color: pink;
            .none-bottom {
              height: 40px;
              // background-color: yellowgreen;
              display: flex;
              justify-content: center;
              .none-reg {
                margin-top: 10px;
                border-radius: 6px;
                font-size: 20px;
                color: #fff;
                background-color: black;
                line-height: 40px;
                text-align: center;
                height: 40px;
                width: 270px;
              }
              .none-tel {
                font-size: 13px;
                color: rgb(154, 148, 148);
                text-align: center;
                line-height: 40px;
                height: 40px;
                width: 250px;
                background-color: aliceblue;
              }
            }
          }
        }
      }
    }
  }
}
</style>
