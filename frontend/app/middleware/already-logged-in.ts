export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useMyAuthStore());
  const isAuthenticated = user.value && user.value.id;

  if (isAuthenticated) {
    return navigateTo("/admin/contacts");
  }

  return true;
});
