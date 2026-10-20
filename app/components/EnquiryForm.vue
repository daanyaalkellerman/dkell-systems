<script setup lang="ts">
import {
  buildMessage,
  enquiryUrl,
  selectedService,
  serviceOptions,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from '~/utils/enquiry'
const route = useRoute()
const form = reactive<Enquiry>({
  name: '',
  businessName: '',
  service: selectedService(route.query.service),
  description: '',
  budget: '',
  timing: '',
})
const errors = ref<EnquiryErrors>({})
const ready = ref(false)
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})
const formElement = useTemplateRef<HTMLFormElement>('formElement')
const preview = useTemplateRef<HTMLDivElement>('preview')
watch(
  () => route.query.service,
  (value) => {
    form.service = selectedService(value)
  },
)
watch(form, () => {
  ready.value = false
})
async function review() {
  errors.value = validateEnquiry(form)
  ready.value = Object.keys(errors.value).length === 0
  await nextTick()
  if (ready.value) preview.value?.focus()
  else formElement.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}
</script>
<template>
  <form ref="formElement" class="enquiry-panel" novalidate @submit.prevent="review">
    <h2>Request a quote</h2>
    <p v-if="!hydrated" class="form-note">
      This message builder needs JavaScript. Use the direct WhatsApp or email link on this page to
      get in touch.
    </p>
    <p class="form-note">
      Required fields are labelled. Your details stay on this page until you choose to open
      WhatsApp.
    </p>
    <p v-if="Object.keys(errors).length" role="alert" class="error-summary">
      Please check the highlighted fields before reviewing your message.
    </p>
    <div class="form-two-col">
      <FormField id="name" v-slot="field" label="Your name (required)" :error="errors.name"
        ><input
          id="name"
          v-model="form.name"
          name="name"
          autocomplete="name"
          required
          maxlength="100"
          :aria-invalid="field.invalid"
          :aria-describedby="field.errorId"
      /></FormField>
      <FormField
        id="business-name"
        v-slot="field"
        label="Business name (required)"
        :error="errors.businessName"
        ><input
          id="business-name"
          v-model="form.businessName"
          name="organization"
          autocomplete="organization"
          required
          maxlength="150"
          :aria-invalid="field.invalid"
          :aria-describedby="field.errorId"
      /></FormField>
    </div>
    <FormField id="service" v-slot="field" label="I'm interested in" :error="errors.service"
      ><select
        id="service"
        v-model="form.service"
        :aria-invalid="field.invalid"
        :aria-describedby="field.errorId"
      >
        <option value="">I'd like some guidance</option>
        <option v-for="option in serviceOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select></FormField
    >
    <FormField
      id="description"
      v-slot="field"
      label="Project description (required)"
      :error="errors.description"
    >
      <textarea
        id="description"
        v-model="form.description"
        required
        minlength="10"
        maxlength="1500"
        rows="4"
        placeholder="What does your business do, and what would you like to build or improve?"
        :aria-invalid="field.invalid"
        :aria-describedby="field.errorId"
      />
    </FormField>
    <div class="form-two-col">
      <FormField id="budget" v-slot="field" label="Budget range" optional :error="errors.budget"
        ><input
          id="budget"
          v-model="form.budget"
          maxlength="100"
          placeholder="Amount and currency, if known"
          :aria-invalid="field.invalid"
          :aria-describedby="field.errorId"
      /></FormField>
      <FormField id="timing" v-slot="field" label="Desired timing" optional :error="errors.timing"
        ><input
          id="timing"
          v-model="form.timing"
          maxlength="100"
          placeholder="A date or rough timeframe"
          :aria-invalid="field.invalid"
          :aria-describedby="field.errorId"
      /></FormField>
    </div>
    <button class="button button-lime" type="submit" :disabled="!hydrated">
      Review WhatsApp message <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span>
    </button>
    <p class="form-note">
      This website does not store form submissions. Opening WhatsApp shares the draft with WhatsApp;
      you still choose whether to send it.
      <NuxtLink to="/privacy">Read our privacy information.</NuxtLink>
    </p>
    <div v-if="ready" ref="preview" class="message-review" tabindex="-1">
      <h3>Review your message</h3>
      <pre>{{ buildMessage(form) }}</pre>
      <a :href="enquiryUrl(form)" class="button button-lime"
        >Open WhatsApp to send <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span
      ></a>
      <p class="form-note">Nothing has been sent. You can still edit the draft in WhatsApp.</p>
    </div>
  </form>
</template>
