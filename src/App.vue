<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  mounted() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (!token || token === "null" || !email || email === "null") {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return this.$router.push("/login");
    }
    this["user/setEmail"](email);
    this["user/setToken"](token);
    this["user/getUserName"](email);
  },
  methods: {
    ...mapMutations(["user/setEmail", "user/setToken", "user/setUserName"]),
    ...mapActions(["user/getUserName"])
  }
};
</script>
