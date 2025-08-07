export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useMyAuthStore());
    const route = /\/admin/.test(to.path);
  const isAuthenticated = user.value && user.value.id;     

  if (!isAuthenticated && route) {
    return navigateTo("/auth/login");
  }
})
