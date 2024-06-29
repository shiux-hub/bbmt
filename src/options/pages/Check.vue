<script lang="ts" setup>
import Bookmark from '~components/Bookmark.vue'
import CheckButton from '~components/CheckButton.vue'
import IconCheck from '~components/icon/IconCheck.vue'
import IconClock from '~components/icon/IconClock.vue'
import IconPlus from '~components/icon/IconPlus.vue'
import { timeout } from '~stores'

const tree = await chrome.bookmarks.getTree()
</script>

<template>
  <div
    class="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100/90 text-base-content backdrop-blur transition-shadow duration-100"
  >
    <div class="navbar w-full justify-between">
      <div class="flex items-center gap-1">
        Check All
        <div class="size-5 rounded-full border-2 border-primary" />
        <IconClock class="size-5 text-gray-400" />
        <IconPlus class="size-5 rotate-45 text-red-400" />
      </div>
      <div class="flex items-center gap-1">
        Delete All
        <IconClock class="size-5 text-gray-400" />
        <IconPlus class="size-5 rotate-45 text-red-400" />
      </div>
      <div class="flex items-center gap-1">
        VIEW/HIDE
        <CheckButton tooltip="Uncheck">
          <div class="size-5 rounded-full border-2 border-primary" />
        </CheckButton>
        <CheckButton tooltip="Success">
          <IconCheck class="size-5 text-green-400" />
        </CheckButton>
        <CheckButton tooltip="Timeout">
          <IconClock class="size-5 text-gray-400" />
        </CheckButton>
        <CheckButton tooltip="Error">
          <IconPlus class="size-5 rotate-45 text-red-400" />
        </CheckButton>
      </div>
      <div class="flex w-64 items-center gap-2">
        <input v-model="timeout" class="range" max="60" min="1" type="range">
        <div class="text-xl font-bold">
          {{ timeout }}
        </div>
      </div>
    </div>
  </div>
  <div class="max-w-[100vw] px-6 pb-16 xl:pr-2">
    <div class="flex flex-row justify-between gap-6">
      <div class="flex-wrap overflow-x-hidden">
        <div v-for="node in tree" :key="node.id">
          <Bookmark :childe="node.children" />
        </div>
      </div>
    </div>
  </div>
</template>
