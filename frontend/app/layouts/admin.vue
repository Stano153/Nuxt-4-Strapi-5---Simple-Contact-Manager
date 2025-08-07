<template>
  <div
    class="grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]"
  >
    <aside class="sticky top-0 z-20 h-dvh hidden md:block bg-background">
      <UiScrollArea class="h-dvh border-r pb-5 px-3">
        <div class="font-semibold text-lg py-5">
          Welcome {{ user?.username }}
        </div>
        <UiDivider />
        <nav class="flex flex-col mt-6">
          <UiButton
            exact-active-class="bg-secondary"
            to="/admin/contacts"
            variant="ghost"
            class="justify-start gap-4"
          >
            <Icon
              name="lucide:users"
              class="size-5 text-muted-foreground"
            />Contacts</UiButton
          >
        </nav>
      </UiScrollArea>
    </aside>
    <main>
      <header class="z-20 border-b">
        <UiContainer
          class="flex items-center justify-between md:justify-end h-[68px] gap-3"
        >
          <div class="flex items-center gap-3 md:hidden">
            <UiAvatar
              :src="user?.image?.url"
              :alt="user?.username"
              class="w-8 h-8"
            >
              <UiAvatarFallback>
                <Icon name="lucide:user" />
              </UiAvatarFallback>
            </UiAvatar>
            <span class="text-sm font-semibold">{{ user?.username }}</span>
            <UiButton
              exact-active-class="bg-secondary"
              to="/admin/contacts"
              variant="ghost"
              class="justify-start gap-4"
            >
              <Icon
                name="lucide:users"
                class="size-5 text-muted-foreground"
              />Contacts</UiButton
            >
          </div>
          <div class="flex gap-3">
            <UiButton
              @click="
                $colorMode.preference =
                  $colorMode.value == 'dark' ? 'light' : 'dark'
              "
              size="icon-sm"
              variant="outline"
              ><Icon name="lucide:sun" size="16"
            /></UiButton>
            <UiButton @click="logout()" size="icon-sm" variant="outline"
              ><Icon name="lucide:log-out" size="16"
            /></UiButton>
          </div>
        </UiContainer>
      </header>
      <UiContainer class="py-5">
        <slot />
      </UiContainer>
    </main>
    <UiToastToaster />
  </div>
</template>

<script lang="ts" setup>
import { UiContainer } from "#components";

const { user } = storeToRefs(useMyAuthStore());

const logout = () => {
  try {
    useMyAuthStore().logout();
    useToast().toast({
      title: "Logged out successfully",
      variant: "success",
      icon: "lucide:log-out",
    });
    navigateTo("/auth/login");
  } catch (error) {
    useToast().toast({
      title: "Logout failed",
      variant: "destructive",
      icon: "lucide:x-circle",
    });
  }
};
</script>
