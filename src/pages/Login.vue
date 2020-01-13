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
        <p class="self-center text-negative" v-if="!formVisible && errorMsj">
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
      await this.loaderTimer(100);
      try {
        const response = await this.$axios.options("test");
        const status = response.status;
        if (status !== 200) {
          this.errorMsj = "Network conection error";
        }
        await this.loaderTimer(750);
        this.formVisible = true;
      } catch (error) {
        this.errorMsj = "Network conection error";
      }
      this.loaderValue = 100;
    },
    loaderTimer(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, time);
      });
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
