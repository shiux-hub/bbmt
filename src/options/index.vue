<script lang="ts" setup>
import '~style.css'
import Check from './pages/Check.vue'
import CheckButton from '~components/CheckButton.vue'
import { timeout } from '~stores'
import packageJson from '~../package.json'
import SuspenseContent from '~components/SuspenseContent.vue'
import IconBookmark from '~components/icon/IconBookmark.vue'
import IconCheck from '~components/icon/IconCheck.vue'
import IconClock from '~components/icon/IconClock.vue'
import IconPlus from '~components/icon/IconPlus.vue'
</script>

<template>
  <div class="drawer bg-base-100 lg:drawer-open">
    <input id="drawer" class="drawer-toggle" type="checkbox">
    <div class="drawer-content">
      <div
        class="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100/90 text-base-content backdrop-blur transition-shadow duration-100"
      >
        <div class="navbar w-full justify-between">
          <div class="flex items-center gap-1">
            Check All
            <div class="size-5 rounded-full border-2 border-black/50" />
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
            <CheckButton><div class="size-5 rounded-full border-2 border-black/50" /></CheckButton>
            <CheckButton><IconCheck class="size-5 text-green-400" /></CheckButton>
            <CheckButton><IconClock class="size-5 text-gray-400" /></CheckButton>
            <CheckButton><IconPlus class="size-5 rotate-45 text-red-400" /></CheckButton>
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
          <Suspense timeout="0">
            <Check />
            <template #fallback>
              <SuspenseContent />
            </template>
          </Suspense>
        </div>
      </div>
    </div>
    <div class="drawer-side z-40">
      <label aria-label="Close menu" class="drawer-overlay" htmlFor="drawer" />
      <aside class="min-h-screen w-64 bg-base-100">
        <div
          class="sticky top-0 z-20 hidden items-center gap-2 bg-base-100/90 px-4 py-2 backdrop-blur lg:flex"
        >
          <a aria-current="page" aria-label="Homepage" class="btn btn-ghost flex-none px-2" href="/">
            <div class="inline-flex text-lg md:text-2xl">BBmt</div>
          </a>
          <div class="inline-block font-mono text-xs">
            {{ packageJson.version }}
          </div>
        </div>
        <div class="h-4" />
        <ul class="menu px-4 py-0">
          <li>
            <a href="/option.">
              <svg
                class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-width="2" strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Home
            </a>
            <a><IconBookmark class="size-5" /> Check</a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
