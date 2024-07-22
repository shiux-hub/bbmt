<script lang="ts" setup>
import '~style.css'
import type { App } from 'vue'
import router from './router'
import packageJson from '~../package.json'
import SuspenseContent from '~components/SuspenseContent.vue'

defineOptions({
  prepare(app: App) {
    // Use any plugins here:
    // app.use
    app.use(router)
  }
})
</script>

<template>
  <div class="drawer bg-base-100 lg:drawer-open">
    <input id="drawer" class="drawer-toggle" type="checkbox">
    <div class="drawer-content">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <KeepAlive>
            <Suspense timeout="0">
              <component :is="Component" />
              <template #fallback>
                <SuspenseContent />
              </template>
            </Suspense>
          </KeepAlive>
        </template>
      </RouterView>
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
            <RouterLink
              v-for="route in $router.options.routes" :key="route.path" custom :to="route.path"
              v-slot="{ isActive, href, navigate }"
            >
              <a :class="isActive ? 'active' : ''" :href="href" @click="navigate">
                <component :is="route.meta.icon" class="size-5" />
                {{ route.meta.title }}
              </a>
            </RouterLink>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
