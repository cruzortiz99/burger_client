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
          <q-icon name="calendar_today" size="xl" color="primary">
          </q-icon>
        </q-circular-progress>
        <welcome v-if="formVisible" />
        <login-form
          :class="['self-center', fadeAnimation]"
          v-if="formVisible"
          @submit="print"
        />
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
    this.runLoader();
  },
  computed: {
    fadeAnimation() {
      return this.formVisible ? "fade-animation" : "";
    }
  },
  methods: {
    print(event) {
      console.log(event);
    },
    async runLoader() {
      const loaderTimer = () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 3000 / 100);
        });
      for (let loader = 0; loader <= 100; loader++) {
        await loaderTimer();
        this.loaderValue = loader;
      }
      this.formVisible = !this.formVisible;
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
