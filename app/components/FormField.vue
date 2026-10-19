<script setup lang="ts">
defineProps<{ id: string; label: string; optional?: boolean; error?: string }>()
</script>
<template>
  <div class="form-field">
    <label :for="id">{{ label }} <span v-if="optional">(optional)</span></label
    ><slot :invalid="!!error" :error-id="error ? id + '-error' : undefined" />
    <p v-if="error" :id="id + '-error'" class="field-error">{{ error }}</p>
  </div>
</template>
