<template>
  <div>
    <div>
      <h1 class="mb-2 text-3xl font-semibold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground">{{ description }}</p>
    </div>
    <UiDivider class="my-8" />

    <div v-if="contact?.data.image && contact.data.image.url">
      <UiAvatar class="size-20" :src="contact.data.image.url" />
    </div>
    <div v-else>
      <UiAvatar class="size-20">
        <UiAvatarFallback>
          <UiIcon class="size-8" icon="lucide:user" />
        </UiAvatarFallback>
      </UiAvatar>
    </div>
    <form @submit="submit" class="mt-8">
      <fieldset class="grid max-w-sm grid-cols-1 gap-5">
        <UiVeeInput name="firstName" label="First name" required />
        <UiVeeInput name="lastName" label="Last name" required />
        <UiVeeInput name="email" label="Email" type="email" required />
        <UiVeeInput name="phone" label="Phone number" type="tel" required />
        <!--         <UiVeeFileInput name="image" label="New Image" accept="image/*" ref="imageInput" />
 -->
        <UiButton type="submit">Update</UiButton>
      </fieldset>
    </form>

    <UiAlertDialog v-model:open="model">
      <UiAlertDialogTrigger as-child>
        <UiButton variant="destructive" class="mt-5">Delete</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            contact.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel />
          <UiAlertDialogAction @click="confirmDelete" />
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});
const title = "Edit Contact";
const description = "Edit this contact";
useSeoMeta({ title, description });
const route = useRoute("admin-contacts-edit-id");
const imageInput = ref<HTMLInputElement | null>(null);

const confirmDelete = () => {
  deleteContact();
};
const model = ref(false);
const { data: contact, refresh } = await useAsyncData(() =>
  useMyContactStore().getById(route.params.id as string)
);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(UpdateContactSchema),
  initialValues: contact.value?.data,
});

const submit = handleSubmit(async (values) => {
  try {
    const res = await useMyContactStore().update(route.params.id as string, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    });

    useToast().toast({
      title: "Contact updated successfully!",
      variant: "success",
      icon: "lucide:badge-check",
      duration: 3000,
    });
    await refresh();
    /*     imageInput.value!.value = "";
     */ setValues(contact.value?.data || {});
    navigateTo("/admin/contacts");
  } catch (error) {
    useToast().toast({
      title: "Error updating contact",
      variant: "success",
      icon: "lucide:badge-x",
    });
  }
});

const deleteContact = async () => {
  try {
    await useMyContactStore().deleteById(route.params.id as string);
    useToast().toast({
      title: "Contact deleted successfully!",
      variant: "success",
      icon: "lucide:badge-check",
      duration: 3000,
    });
    navigateTo("/admin/contacts");
  } catch (error) {
    useToast().toast({
      title: "Error deleting contact",
      variant: "destructive",
      icon: "lucide:badge-x",
    });
  }
};
</script>
