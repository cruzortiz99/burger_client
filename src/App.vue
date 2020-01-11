<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  mounted() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("user");
    if (!(token && email)) {
      this.$router.push("/login");
    }
    this["user/setEmail"](email);
    this["user/setToken"](token);
    this["user/setUserName"](name);
  },
  methods: {
    ...mapMutations(["user/setEmail", "user/setToken", "user/setUserName"])
  }
};
</script>
