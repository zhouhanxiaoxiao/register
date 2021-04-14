<template>
  <nav class="navbar" style="height: 8vh;background-color: cornflowerblue;min-height: 8vh;max-height: 80px">
    <a class="navbar-brand" style="display: inline-block;height: 100%;color: white;font-size: 14px" @click="gotoHome">
      <img src="../../assets/login.png" style="height: 100%;">
    </a>
    <div style="color: white;height: 6vh;line-height: 6vh;font-size: 14px">
      {{ $t("mainPageTtile") }}
      <Icon type="md-desktop"/>
    </div>
    <div class="form-inline my-2 my-lg-0" style="max-height: 6vh;line-height: 6vh">
      <language></language>
      <Button style="height: 100%;" @click="gotoLogin" v-if="showLogin"
              shape="circle" icon="ios-contact" size="large">{{ $t("login") }}
      </Button>

      <div class="dropdown" v-else>
        <button class="btn btn-outline-light dropdown-toggle"
                type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
          {{ $t("hello") + "，" + helloUser }}
        </button>
        <div class="dropdown-menu dropdown-menu-right" style="font-size: 14px;line-height: normal">
          <a class="dropdown-item" href="#" @click="gotoPersonal">{{ $t("personal") }}</a>
          <a class="dropdown-item" href="#" v-if="isAdmin" @click="gotoAdminPage">{{ $t("adminPage") }}</a>
          <a class="dropdown-item" href="#" @click="casOut">{{ $t("exit") }}</a>
        </div>
      </div>
    </div>
    <v-loading :show="loading"></v-loading>
  </nav>
</template>

<script>
import util from "@/components/public/util";
import Language from "@/components/public/language";
import VLoading from "@/components/public/v-loading";

export default {
  name: "v-cibrnav",
  components: {VLoading, Language},
  data : function (){
    return{
      loading: false
    }
  },
  beforeMount() {
  },
  methods : {
    gotoAdminPage : function (){
      this.$router.push("/manager");
    },
    gotoPersonal : function (){
      this.$router.push("/personal");
    },
    gotoHome :function (){
      this.$router.push("/home");
    },
    gotoLogin : function (){
      window.location = util.casLoginUrl;
    },
    casOut : function (){
      this.loading = true;
      window.open(util.casOutUrl);
      setTimeout(function (){
        window.location.reload();
      },5000);
    },
    exitSystem : function (){
      this.loading = true;
      var _this = this;
      this.$axios.post("/login/exit",{}).then(function (res){
        _this.loading = false;
        if (res.data.code != "success"){
          _this.$Message.error(_this.$t(res.data.code));
        }else {
          _this.$cookies.remove("token");
          _this.$cookies.remove("user");
          window.location.reload();
        }
      }).catch(function (res){
        _this.loading = false;
        console.log(res);
        _this.$Message.error(_this.$t("err.systemErr"));
      })
    }
  },
  computed : {
    showLogin : function (){
      return this.$store.getters.getUser == undefined;
    },
    helloUser : function (){
      return this.$store.getters.getName;
    },
    isAdmin : function (){
      return this.$store.getters.isAdmin;
    }
  }
}
</script>

<style scoped>

</style>