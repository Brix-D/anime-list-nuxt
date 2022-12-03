import { defineStore } from 'pinia';
import { ref } from 'vue';
// import axios from '@/plugins/axios';
import type SearchResponse from '@/components/types/api/search';

export const useCatalogStore = defineStore('catalog', () => {
  const list = ref<SearchResponse>({
    data: [],
    pagination: {},
  });
  const loading = ref<boolean>(true);
  const errorSearch = ref<any>({});
  const { $api } = useNuxtApp();

  async function search(query: string) {
    loading.value = true;
    try {
      const { data: response } = await $api<SearchResponse>(`/anime`, {
        query: { q: query },
      });
      list.value.data = response.map((item: any) => ({
        ...item,
        images: {
          webp: item.images?.webp?.image_url,
          jpg: item.images?.jpg?.image_url,
        },
      }));
    } catch (error: any) {
      errorSearch.value = error.response.data;
    }
    loading.value = false;
  }

  return { search, list, loading, errorSearch };
});

export default useCatalogStore;
