<script setup lang="ts">
import type { SearchResponse } from '@/components/types/api/search';
// import useSearch from '@/composables/useSearch';
import useCatalogStore from '@/stores/catalog';
// const TheCatalog = defineAsyncComponent(
//   () => import('@/components/blocks/TheCatalog.vue'),
// );
const route = useRoute();

const catalogStore = useCatalogStore();

const getCatalog = async () => {
  const { name: querySearch = '' } = route.query;
  await catalogStore.search(querySearch as string);
};

onMounted(async () => {
  await getCatalog();
});
</script>

<template>
  <div>
    <div>
      <div v-if="catalogStore.loading">Loading...</div>
      <div v-else>
        <div v-if="Object.keys(catalogStore.errorSearch).length">
          {{ catalogStore.errorSearch.message }}
        </div>
        <div v-else>
          <LazyBlocksTheCatalog :items="catalogStore.list.data" class="py-4" />
        </div>
      </div>
    </div>
  </div>
</template>
