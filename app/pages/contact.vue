<script setup lang="ts">
import { business } from '~/data/business'
usePageSeo(
  'Contact / Request a Quote',
  'Discuss your website or business technology project with D-Kell Systems. Prepare an enquiry for WhatsApp, or contact us directly.',
)
</script>
<template>
  <div>
    <PageIntro
      eyebrow="Contact"
      title="Tell us about your project."
      description="Have a clear brief or just an idea? Share a little about your business and what you need help with."
    />
    <section class="contact-section section-space">
      <div class="shell contact-grid">
        <div>
          <p class="eyebrow">Start a conversation</p>
          <h2>Let's discuss<br />what you need.</h2>
          <p class="contact-intro">
            WhatsApp is our preferred enquiry channel. Use the form to prepare a message, or open a
            conversation directly.
          </p>
          <a
            :href="business.contact.whatsappUrl"
            class="phone-link"
            aria-label="Chat directly on WhatsApp"
            >{{ business.contact.whatsappDisplay }} ↗</a
          >
          <p class="contact-small">You review and send the message yourself.</p>
          <a
            v-if="business.contact.emailConfirmed"
            :href="'mailto:' + business.contact.emailSupplied"
            class="social-link"
            >{{ business.contact.emailSupplied }}</a
          ><a :href="business.contact.instagram" class="social-link">Instagram ↗</a>
        </div>
        <EnquiryForm />
      </div>
    </section>
  </div>
</template>
