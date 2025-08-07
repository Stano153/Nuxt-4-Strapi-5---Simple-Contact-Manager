<template>
  <Icon v-bind="props" />
</template>

<script lang="ts" setup>
import { Icon, type IconifyIconProps } from "@iconify/vue";
const props = defineProps<IconifyIconProps>();
</script>
