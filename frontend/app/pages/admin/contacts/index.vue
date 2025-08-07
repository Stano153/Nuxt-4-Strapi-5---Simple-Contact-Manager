<template>
  <div>
    <div
      class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
    >
      <div>
        <h1 class="tracking-tight text-3xl font-semibold mb-2">{{ title }}</h1>
        <p class="text-muted-foreground">{{ description }}</p>
      </div>
      <UiButton class="h-9" size="sm" to="/admin/contacts/create">
        <UiIcon icon="lucide:plus" class="mr-2" />
        Add Contact
      </UiButton>
    </div>
    <UiDivider class="my-8" type="dashed" />
    <UiDatatable :options="options" :columns="columns" :data="contacts">
      <template #actions="{ cellData }: { cellData: Contact }">
        <UiButton
          class="h-7 text-xs"
          size="sm"
          @click="$router.push(`/admin/contacts/edit/${cellData.documentId}`)"
          >Edit</UiButton
        >
      </template>
      <template #image="{ cellData }: { cellData: Contact }">
        <div v-if="cellData.image && cellData.image.url">
          <UiAvatar
            :src="cellData.image.url"
            :alt="`${cellData.firstName} ${cellData.lastName}`"
            class="w-8 h-8"
          />
        </div>
        <UiAvatar class="border border-primary" v-else
          ><UiAvatarFallback> <UiIcon icon="lucide:user" /> </UiAvatarFallback
        ></UiAvatar>
      </template>
    </UiDatatable>
  </div>
</template>

<script lang="ts" setup>
import type { Config, ConfigColumns } from "datatables.net";

definePageMeta({
  layout: "admin",
});
const title = "Contacts";
const description = "Manage your contacts here.";
useSeoMeta({
  title,
  description,
});
const { records: contacts } = storeToRefs(useMyContactStore());
await useAsyncData("contacts", () =>
  useMyContactStore().get({ sort: ["createdAt:desc"], populate: "*" })
);

const columns: ConfigColumns[] = [
  {
    data: null,
    title: "Image",
    searchable: false,
    orderable: false,
    name: "Image",
    render: "#image",
  },
  { data: "firstName", title: "First Name", responsivePriority: 0.1 },
  { data: "lastName", title: "Last Name", responsivePriority: 0.2 },
  { data: "email", title: "Email" },
  { data: "phone", title: "Phone" },
  {
    data: "createdAt",
    title: "Created At",
    render(d) {
      return useDateFormat(d, "MMMM DD, YYYY").value;
    },
  },

  {
    data: null,
    title: "",
    className: "no-export",
    searchable: false,
    orderable: false,
    name: "actions",
    render: "#actions",
  },
];

const options: Config = {
  buttons: [
    {
      extend: "colvis",
      text: "Columns",
      columns: ":not(.no-export)",
    },
    "copy",
    "excel",
    "pdf",
    "print",
    "csv",
  ],
  dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
  responsive: true,
  autoWidth: true,
  select: true,
  order: [[columns.findIndex((c) => c.data === "createdAt"), "desc"]],
};
console.log(contacts.value);
</script>
