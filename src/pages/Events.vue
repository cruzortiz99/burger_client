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
          <div class="q-gutter-md">
            <q-date
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
                <q-item-section>{{ message }}</q-item-section>
                <q-popup-edit
                  v-model="events[eventKey].messages[messageKey]"
                  @save="editEvent"
                >
                  <q-input v-model="events[eventKey].messages[messageKey]" />
                </q-popup-edit>
                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="
                        () => {
                          deleteEvent({ eventKey, messageKey });
                        }
                      "
                    />
                  </div>
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
export default {
  name: "Events",
  data() {
    return {
      date: null,
      events: []
    };
  },
  created() {
    this.date = this.getDateFormat(new Date());
    this.events = [
      {
        date: this.getDateFormat(new Date()),
        messages: ["Testing 1", "Testing 2"]
      },
      {
        date: this.getDateFormat(new Date("2020/01/06")),
        messages: ["Testing 3", "Testing 4"]
      }
    ];
  },
  computed: {
    calendarEvents() {
      return this.events.map(event => event.date);
    }
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
    deleteEvent(indexes) {
      console.log(indexes);
    },
    addEvent() {
      console.log("addEvent");
    },
    editEvent(eventToEdit) {
      console.log(eventToEdit, this.events);
    }
  }
};
</script>

<style />
