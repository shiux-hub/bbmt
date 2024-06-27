<script lang="ts" setup>
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { ref } from 'vue'
import { RequestStatus } from '~utils/enums'
import instance from '~utils/request'
import { timeout } from '~stores'
import IconLoading from '~components/icon/IconLoading.vue'
import IconCheck from '~components/icon/IconCheck.vue'
import IconClock from '~components/icon/IconClock.vue'
import IconPlus from '~components/icon/IconPlus.vue'

defineProps<{
  node: chrome.bookmarks.BookmarkTreeNode
}>()

const status = ref(RequestStatus.Pending)

async function handleClick(url: string, config: AxiosRequestConfig) {
  status.value = RequestStatus.Loading
  instance.get(url, config)
    .then(() => {
      status.value = RequestStatus.Succuss
    })
    .catch((error: AxiosError) => {
      status.value = RequestStatus.Error
      console.error(error)
    })
}
</script>

<template>
  <div class="my-2 flex items-center gap-4">
    <button class="btn btn-square btn-ghost btn-sm" @click="handleClick(node.url, { timeout: timeout * 1000 })">
      <template v-if="status === RequestStatus.Loading">
        <IconLoading class="size-5 text-white" />
      </template>
      <template v-else-if="status === RequestStatus.Succuss">
        <IconCheck class="size-5 text-green-400" />
      </template>
      <template v-else-if="status === RequestStatus.Error">
        <IconPlus class="size-5 rotate-45 text-red-400" />
      </template>
      <template v-else-if="status === RequestStatus.Timeout">
        <IconClock class="size-5 text-gray-400" />
      </template>
      <template v-else>
        <div class="size-5 rounded-full border-2 border-black/50" />
      </template>
    </button>
    <div v-if="node.dateAdded" class="badge badge-secondary">
      {{ node.dateAdded }}
    </div>
    <div>{{ node.title }}</div>
    <a class="link-hover link link-primary font-mono" :href="node.url" target="_blank">{{ node.url }}</a>
  </div>
</template>
