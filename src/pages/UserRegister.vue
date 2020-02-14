<template>
  <q-page>
    <q-banner class="col-3 bg-secondary text-white">
      <q-toolbar>
        <q-icon name="account_box" />
        <q-toolbar-title>User Register</q-toolbar-title>
      </q-toolbar>
    </q-banner>
    <div class="q-pa-md">
      <q-form v-on="listeners" class="q-gutter-md">
        <div>
          <q-input
            v-model="user.name"
            label="Name"
            placeholder="Inset name"
            lazy-rules
            :rules="computedRules.userName"
          >
            <template v-slot:before>
              <q-icon name="text_fields" />
            </template>
          </q-input>
          <q-input
            v-model="user.email"
            label="E-mail"
            placeholder="example@example.com"
            lazy-rules
            :rules="computedRules.email"
          >
            <template v-slot:before>
              <q-icon name="email"></q-icon>
            </template>
          </q-input>
          <q-input
            v-model="user.password"
            :type="passwordVisibility.type"
            placeholder="Insert Password"
            lazy-rules
            :rules="computedRules.password"
          >
            <template v-slot:before>
              <q-icon
                :name="passwordVisibility.icon"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
              ></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row justify-center">
          <q-btn type="submit" label="Save" color="primary" />
          <q-btn type="reset" label="Clear" color="warning" flat />
          <q-btn
            type="cancel"
            label="Cancel"
            color="negative"
            flat
            @click="cancelRegister"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'UserRegister',
  data() {
    return {
      isPassword: true,
      user: {
        name: null,
        email: null,
        password: null
      }
    };
  },
  computed: {
    passwordVisibility() {
      return this.isPassword
        ? { type: 'password', icon: 'visibility_off' }
        : { type: 'text', icon: 'visibility' };
    },
    listeners() {
      const self = this;
      return {
        ...self.$listeners,
        submit() {
          self.saveUserIntoDb();
        },
        reset() {
          self.user.userName = null;
          self.user.email = null;
        }
      };
    },
    computedRules() {
      return {
        userName: [
          val => (val && val.length > 0) || 'Please write a valid user'
        ],
        email: [
          val => (val && val.length > 0) || 'Please write a valid mail',
          val => {
            const matches = val.match(/^\w+@\w+\.\w+$/);
            return (
              (matches && matches.length > 0) || 'Please insert a rigth email'
            );
          }
        ],
        password: [
          val => {
            return (val && val.length > 0) || 'Please write a valid password';
          }
        ]
      };
    }
  },
  methods: {
    async saveUserIntoDb() {
      const response = await this.$axios.post('sign-in', this.user);
      if (response.status === 400) {
        return false;
      }
      if (response.status === 403) {
        return false;
      }
      return this.goTo('/login');
    },
    goTo(pathRoute) {
      this.$router.push(pathRoute);
    },
    cancelRegister() {
      this.goTo('/login');
    }
  }
});
</script>

<style />
