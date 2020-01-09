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
          <q-icon name="calendar_today" size="xl" color="primary"></q-icon>
        </q-circular-progress>
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
export default {
  name: "Login",
  components: {
    Welcome,
    LoginForm
  },
  data() {
    return {
      formVisible: false,
      loaderValue: 0
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
      const response = await this.$axios.post("login", requestUser);
      const status = response.status;
      if (status == 400) {
        return false;
      }
      if (status == 403) {
        return false;
      }
      const userWithToken = response.data;
      localStorage.setItem("token", userWithToken.token);
      localStorage.setItem("user", userWithToken.name);
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
      try {
        this.$axios.options("test").status;
        this.loaderValue = 100;
        await loaderTimer(750);
        this.formVisible = true;
      } catch (error) {
        return null;
      }
    }
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
