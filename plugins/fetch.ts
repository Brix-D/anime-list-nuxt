export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const apiFetch = $fetch.create({ baseURL: config.apiBaseUrl });

  return {
    provide: {
      api: apiFetch,
    },
  };
});
