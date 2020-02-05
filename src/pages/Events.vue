<template>
  <q-page class="column justify-center">
    <q-banner class="col-3 bg-secondary text-white">
      <q-toolbar>
        <q-icon name="today" />
        <q-toolbar-title>Events</q-toolbar-title>
        <q-btn
          flat
          color="white"
          label="Add Event"
          icon="add"
          @click="addEvent"
        ></q-btn>
      </q-toolbar>
    </q-banner>
    <q-splitter
      class="col self-center"
      :value="50"
      :limits="[50, 50]"
      horizontal
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="q-gutter-md column items-center">
            <q-date
              class="col big-80"
              v-model="date"
              :events="calendarEvents"
              event-color="warning"
            ></q-date>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <q-tab-panels v-model="date">
          <q-tab-panel
            v-for="(event, eventKey) in events"
            :name="event.date"
            :key="eventKey"
          >
            <div class="text-h4 q-mb-md">{{ event.date }}</div>
            <q-list separator>
              <q-item
                v-for="(message, messageKey) in event.messages"
                :key="messageKey"
              >
                <q-item-section>
                  {{ message }}
                  <q-popup-edit :value="events[eventKey].messages[messageKey]">
                    <q-input
                      :value="events[eventKey].messages[messageKey]"
                      @change="
                        event => {
                          editEvent(event, { eventKey, messageKey });
                        }
                      "
                      autofocus
                    />
                  </q-popup-edit>
                </q-item-section>
                <q-item-section top side>
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="
                      () => {
                        removeEvent({ eventKey, messageKey });
                      }
                    "
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Events",
  data() {
    return {
      date: null
    };
  },
  mounted() {
    this.date = this.getDateFormat(new Date());
    this.getEvents();
  },
  computed: {
    calendarEvents() {
      return this.events.map(event => event.date);
    },
    ...mapGetters({
      events: "user/events",
      email: "user/email"
    })
  },
  methods: {
    getDateFormat(date) {
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
      return `${year}/${month}/${day}`;
    },
    removeEvent({ eventKey, messagesKey }) {
      const eventToRemove = {
        email: this.email,
        ...JSON.parse(JSON.stringify(this.events[eventKey]))
      };
      eventToRemove.messages.splice(messagesKey, 1);
      if (eventToRemove.messages.length) {
        return this.updateEvent(eventToRemove);
      }
      return this.deleteEvent(eventToRemove);
    },
    addEvent() {
      let eventToSave = JSON.parse(JSON.stringify(this.events)).filter(
        event => event.date === this.date
      )[0];
      if (eventToSave) {
        eventToSave.messages.push("New Event");
        return this.saveEvent(eventToSave);
      }
      eventToSave = {
        email: this.email,
        date: this.date,
        messages: ["New Event"]
      };
      return this.saveEvent(eventToSave);
    },
    editEvent(event, { eventKey, messageKey }) {
      const eventToEdit = { ...this.events[eventKey] };
      eventToEdit.messages[messageKey] = event.target.value;
      this.updateEvent(eventToEdit);
    },
    ...mapActions({
      getEvents: "user/getEvents",
      saveEvent: "user/saveEvent",
      updateEvent: "user/updateEvent",
      deleteEvent: "user/deleteEvent"
    })
  }
};
</script>

<style>
.big-80 {
  width: 80%;
}
</style>
