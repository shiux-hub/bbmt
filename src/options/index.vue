<script lang="ts" setup>
import '~style.css'
import Check from './pages/Check.vue'
import packageJson from '~../package.json'
import SuspenseContent from '~components/SuspenseContent.vue'
import IconBookmark from '~components/icon/IconBookmark.vue'
</script>

<template>
  <div class="drawer bg-base-100 lg:drawer-open">
    <input id="drawer" class="drawer-toggle" type="checkbox">
    <div class="drawer-content">
      <Suspense timeout="0">
        <Check />
        <template #fallback>
          <SuspenseContent />
        </template>
      </Suspense>
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
            <a>
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
