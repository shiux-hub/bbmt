<script lang="ts" setup>
import Bookmark from '~components/Bookmark.vue'

const tree = await chrome.bookmarks.getTree()
</script>

<template>
  <div class="flex-wrap overflow-x-hidden">
    <div v-for="node in tree" :key="node.id">
      <Bookmark :childe="node.children" />
    </div>
  </div>
</template>
