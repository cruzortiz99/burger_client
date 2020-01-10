<template>
  <q-layout class="fit">
    <q-page-container>
      <q-page class="column justify-center">
        <q-circular-progress
          class="self-center"
          v-if="!formVisible"
          :value="loaderValue"
          size="90px"
          color="primary"
          show-value
        >
          <q-icon name="calendar_today" size="xl" color="primary" />
        </q-circular-progress>
        <p class="self-center" v-if="!formVisible && errorMsj">
          {{ errorMsj }}
        </p>
        <div class="column justify-center q-gutter-md" v-if="formVisible">
          <welcome />
          <login-form :class="['self-center', fadeAnimation]" @submit="login" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Welcome from "./Welcome.vue";
import LoginForm from "../components/LoginForm";
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    Welcome,
    LoginForm
  },
  data() {
    return {
      formVisible: false,
      loaderValue: 0,
      errorMsj: null
    };
  },
  mounted() {
    this.testConexion();
  },
  computed: {
    fadeAnimation() {
      return this.formVisible ? "fade-animation" : "";
    }
  },
  methods: {
    async login(user) {
      const requestUser = {
        email: user.userName,
        password: user.password
      };
      const status = await this["user/login"](requestUser);
      if (status != 200) {
        return false;
      }
      this.$router.push("/events");
      return true;
    },
    async testConexion() {
      const loaderTimer = time =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time);
        });
      await loaderTimer(100);
      const response = await this.$axios.options("test");
      const status = response.status;
      this.loaderValue = 100;
      if (status !== 200) {
        this.errorMsj = "Network conection error";
        return false;
      }
      await loaderTimer(750);
      this.formVisible = true;
    },
    ...mapActions(["user/login"])
  }
};
</script>

<style>
.fade-animation {
  animation: fade 3s;
  animation-fill-mode: both;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
