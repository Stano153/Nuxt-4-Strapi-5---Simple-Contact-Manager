export const useMyAuthStore = defineStore("Auth", () => {
  const { login, logout, register } = useStrapiAuth();
  const user = useStrapiUser<User>();
  return {
    user,
    login,
    register,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyAuthStore, import.meta.hot));
}
