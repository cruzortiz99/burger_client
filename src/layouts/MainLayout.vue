<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          v-if="logedIn"
          aria-label="Menu"
        />

        <q-toolbar-title>Katalina App</q-toolbar-title>

        <div>Katalina v {{ this["app_info/VERSION"] }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="logedIn"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item
          clickable
          tag="menu"
          href="#"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-item-label header>Menu</q-item-label>
        </q-item>
        <q-item clickable @click="goToEvents">
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Events</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="goToMyInfo">
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My information</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    logedIn() {
      return this["user/token"] && this["user/email"];
    },
    ...mapGetters(["app_info/VERSION", "user/email", "user/token"])
  },
  methods: {
    goToEvents() {
      this.goTo("/events");
    },
    goToMyInfo() {
      this.goTo("/my-info");
    },
    goTo(newPath) {
      if (this.$route.path !== newPath) {
        this.$router.push(newPath);
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      this.goTo("/login");
    }
  }
};
</script>
