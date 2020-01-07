<template>
  <q-page>
    <q-banner class="col-3 bg-secondary text-white">
      <q-toolbar>
        <q-icon name="account_box" />
        <q-toolbar-title>User Info</q-toolbar-title>
      </q-toolbar>
    </q-banner>
    <div class="column justify-center">
      <div class="q-pa-md">
        <q-input v-model="user.userName" label="Name" readonly>
          <template v-slot:before>
            <q-icon name="text_fields" />
          </template>
          <q-popup-edit v-model="user.userName" @save="saveUserIntoDb">
            <q-input v-model="user.userName" autofocus />
          </q-popup-edit>
        </q-input>
        <q-input v-model="user.email" label="E-mail" readonly>
          <template v-slot:before>
            <q-icon name="email"></q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        userName: "Cruz Ortiz",
        email: "cruzortiz099@gmail.com"
      }
    };
  },
  methods: {
    saveUserIntoDb() {
      console.log(this.user);
      throw Error("most comminicate with backend");
    },
    loadEventsFromDb() {
      throw Error("most communicae with backend");
    }
  }
};
</script>

<style />
