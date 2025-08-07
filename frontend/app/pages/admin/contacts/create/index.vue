<template>
  <div>
    <h1 class="tracking-tight text-3xl font-semibold mb-2">{{ title }}</h1>
    <p class="text-muted-foreground">{{ description }}</p>
    <UiDivider class="my-8" type="dashed" />
    <form @submit="submit">
      <fieldset class="grid grid-cols-1 gap-5 max-w-sm">
        <UiVeeInput label="First Name" name="firstName" required />
        <UiVeeInput label="Last Name" name="lastName" required />
        <UiVeeInput label="Email" name="email" type="email" required />
        <UiVeeInput label="Phone" name="phone" type="tel" required />
        <!--         <UiVeeFileInput label="Profile Image" name="image" accept="image/*" />
 -->
        <UiButton size="sm" type="submit"> Create Contact </UiButton>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { faker } from "@faker-js/faker";
definePageMeta({
  layout: "admin",
});
const title = "Create Contact";
const description = "Create your contacts here.";
useSeoMeta({
  title,
  description,
});

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(ContactSchema),
});

const submit = handleSubmit(async (values: any) => {
  try {
    const res = await useMyContactStore().create({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    });
    /* const fd = new FormData();
    fd.append("files", values.image);
    fd.append("refId", `${res.data.id}`);
    fd.append("ref", "api::contact.contact");
    fd.append("field", "image");

    const client = useStrapiClient();
    await client("upload", {
      method: "POST",
      body: fd,
    }); */
    useToast().toast({
      title: "Contact created successfully!",
      variant: "success",
      icon: "lucide:badge-check",
      duration: 3000,
    });
    await navigateTo("/admin/contacts");
  } catch (error) {
    useToast().toast({
      title: "Error creating contact",
      variant: "success",
      icon: "lucide:badge-x",
    });
  }
});

/* onMounted(() => {
  if (import.meta.dev) {
    setValues({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    });
  }
}); */
</script>
