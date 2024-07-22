<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import IconCheck from '~components/icon/IconCheck.vue'
import IconPlus from '~components/icon/IconPlus.vue'
import IconLinkOut from '~components/icon/IconLinkOut.vue'

const absTabs = await chrome.tabs.query({ currentWindow: true })
const tabs = toRef(absTabs)
const tabsUrl = computed(() => tabs.value.map(tab => tab.url).sort())

const onlyDuplicate = ref(false)

// chrome.tabs.onUpdated.addListener(queryTabs)
// chrome.tabs.onRemoved.addListener(queryTabs)

// async function queryTabs() {
//   absTabs.value = await chrome.tabs.query({ currentWindow: true })
// }

function closeTab(id: number) {
  chrome.tabs.remove(id)
}

function switchToTab(id: number) {
  chrome.tabs.update(id, { active: true })
}

function testDuplicate(url: string) {
  return !url || tabsUrl.value.filter(item => item === url).length === 1
}

watch(onlyDuplicate, (val) => {
  tabs.value = val ? absTabs.filter(tab => !testDuplicate(tab.url)).sort((a, b) => a.url.localeCompare(b.url)) : absTabs
})
</script>

<template>
  <div
    class="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100/90 text-base-content backdrop-blur transition-shadow duration-100"
  >
    <div class="navbar w-full justify-between">
      <div class="flex items-center gap-2 font-bold">
        <input v-model="onlyDuplicate" class="checkbox" type="checkbox">
        Only Duplicate
      </div>
    </div>
  </div>

  <div>
    <div class="overflow-x-auto">
      <table class="table table-sm">
        <thead>
          <tr>
            <th>
              <label class="flex items-center">
                <input class="checkbox" type="checkbox">
              </label>
            </th>
            <th>Title</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="tab in tabs" :key="tab.id">
              <td>
                <div class="flex items-center justify-center gap-2">
                  <label class="flex items-center">
                    <input class="checkbox" type="checkbox">
                  </label>
                  <button class="btn btn-square btn-ghost btn-sm" @click="switchToTab(tab.id)">
                    <IconLinkOut class="size-5" />
                  </button>
                  <IconCheck v-if="testDuplicate(tab.url)" class="size-5 " />
                  <div class="tooltip tooltip-right" data-tip="Close Tab">
                    <button class="btn btn-square btn-ghost btn-sm" @click="closeTab(tab.id)">
                      <IconPlus class="size-5 rotate-45 text-red-400" />
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <div class="w-72 overflow-hidden text-ellipsis text-nowrap" @click="switchToTab(tab.id)">
                  {{ tab.title }}
                </div>
              </td>
              <td><a class="link-hover link link-primary overflow-hidden text-ellipsis text-nowrap font-mono" :href="tab.url" target="_blank">{{ tab.url }}</a></td>
            </tr>
          </TransitionGroup>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: transform(30px);
}
</style>
