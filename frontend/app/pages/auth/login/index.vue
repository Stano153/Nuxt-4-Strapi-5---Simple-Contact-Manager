<template>
  <div class="flex h-screen items-center justify-center">
    <div class="w-full max-w-[330px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
      <p class="mt-1 text-muted-foreground">
        Enter your email & password to log in.
      </p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
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
            <UiButton class="w-full" type="submit" text="Log in" />
          </div>
        </fieldset>
      </form>

      <p class="mt-4 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="/auth/register"
          >Create account</NuxtLink
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
  title: "Log in",
  description: "Enter your email & password to log in.",
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
});

const submit = handleSubmit(async (value) => {
  try {
    await useMyAuthStore().login({
      identifier: value.email,
      password: value.password,
    });

    console.log("Login successful:", value);
    useToast().toast({
      title: "Logged in successfully!",
      description: "You have successfully logged in.",
      variant: "success",
      icon: "lucide:badge-check",
    });
    useRouter().go(0);
  } catch (error) {
    useToast().toast({
      title: "Login failed",
      description: "Please check your email and password.",
      variant: "destructive",
      icon: "lucide:badge-x",
      duration: 12000,
    });
  }
});
</script>
