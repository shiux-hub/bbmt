<script lang="ts" setup>
import { ref } from 'vue'
import BookmarkItem from './BookmarkItem.vue'

const props = defineProps<{
  breadcrumbs?: string[]
  childe?: chrome.bookmarks.BookmarkTreeNode[]
}>()

const breadcrumbs = ref(props.breadcrumbs || [])
</script>

<template>
  <div>
    <div v-for="node in childe" :key="node.id">
      <div v-if="node.children" class="collapse collapse-arrow bg-base-200">
        <input :name="`accordion-${node.parentId}`" type="radio">
        <div class="collapse-content">
          <Bookmark v-if="node.children.length <= 1" :breadcrumbs="[...breadcrumbs, node.title]" :childe="node.children" />
          <Bookmark v-else :childe="node.children" />
        </div>
        <div class="collapse-title text-xl font-medium">
          <template v-if="breadcrumbs.length > 0">
            <div class="breadcrumbs">
              <ul>
                <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
                  {{ breadcrumb }}
                </li>
                <li>{{ node.title }}</li>
              </ul>
            </div>
          </template>
          <template v-else>
            {{ node.title }}
          </template>
        </div>
      </div>
      <BookmarkItem v-else :node="node" />
    </div>
  </div>
</template>
