<script>
import { mapState, mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';

export default {
  computed: {
    ...mapState(messageToastStore, ['messages']),
  },
  methods: {
    ...mapActions(messageToastStore, ['closeToast']),
  },
};
</script>

<template>
  <div class="toast-container top-0 end-0">
    <div
      v-for="(msg, key) in messages"
      :key="'toast' + key "
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <small class="text-muted">時間</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="closeToast(key)"
        ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>
