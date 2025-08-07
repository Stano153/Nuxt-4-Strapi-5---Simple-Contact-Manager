<template>
  <div class="flex h-screen items-center justify-center">
    <div class="w-full max-w-[330px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
        Create account
      </h1>
      <p class="mt-1 text-muted-foreground">
        Populate your details to create an account.
      </p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput label="Username" name="username" placeholder="john_doe" />
          <div>
            <UiVeeInput
              label="Email"
              type="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <UiVeeInput label="Password" type="password" name="password" />
          </div>
          <div>
            <UiButton class="w-full" type="submit" text="Create Account" />
          </div>
        </fieldset>
      </form>

      <p class="mt-4 text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="/auth/login"
          >Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["already-logged-in"],
});

useSeoMeta({
  title: "Create Account",
  description: "Enter your email & password to create an account.",
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(RegisterSchema),
});

const submit = handleSubmit(async (value) => {
  try {
    await useMyAuthStore().register(value);

    console.log("Created successfuly:", value);
    useToast().toast({
      title: "Account created successfuly!",
      description: "Welcome aboard!",
      variant: "success",
      icon: "lucide:badge-check",
      duration: 12000,
    });
    useRouter().go(0);
  } catch (error: any) {
    useToast().toast({
      title: "Registration failed",
      description: error.error.message,
      variant: "destructive",
      icon: "lucide:badge-x",
      duration: 12000,
    });
  }
});
</script>
