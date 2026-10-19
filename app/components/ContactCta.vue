<script setup lang="ts">
import { business } from '~/data/business'
withDefaults(defineProps<{ service?: string }>(), { service: '' })
</script>
<template>
  <section class="contact-section closing-section section-space">
    <RevealBlock class="shell cta-layout"
      ><p class="eyebrow">Your next project</p>
      <h2>Tell us what you'd<br />like to build.</h2>
      <p class="contact-intro">
        Share a little about your business and what you need help with. We can discuss the scope and
        the next steps.
      </p>
      <div class="hero-actions">
        <a :href="business.contact.whatsappUrl" class="button button-lime"
          >Discuss it on WhatsApp <span aria-hidden="true">↗</span></a
        ><NuxtLink
          :to="service ? { path: '/contact', query: { service } } : '/contact'"
          class="text-link"
          >Prepare a project enquiry <span aria-hidden="true">→</span></NuxtLink
        >
      </div>
      <p class="closing-note">
        You choose when to send. No enquiry is sent automatically.
      </p></RevealBlock
    >
  </section>
</template>
