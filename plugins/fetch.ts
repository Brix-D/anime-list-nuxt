export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const apiFetch = $fetch.create({ baseURL: config.public.apiBaseUrl });
  // nuxtApp.provide('$api', () => apiFetch);
  return {
    provide: {
      api: apiFetch,
    },
  };
});
