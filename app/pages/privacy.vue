<script setup lang="ts">
import { business } from '~/data/business'
usePageSeo(
  'Privacy',
  'How the D-Kell Systems website handles enquiry details, third-party links and technical hosting information.',
)
</script>
<template>
  <div>
    <PageIntro
      eyebrow="Privacy"
      title="Your information."
      description="This explains how this version of the D-Kell Systems website works. Last updated 18 October 2026."
    />
    <article class="shell section-bottom narrow-copy">
      <h2>The enquiry form</h2>
      <p>
        The form asks for your name, business name, service and project description, with optional
        budget and timing. It uses these details in your browser to prepare a WhatsApp message. The
        website does not submit the form to a server, save it to browser storage or keep a copy of
        it. Leaving or reloading the page clears the form.
      </p>
      <p>
        When you choose “Open WhatsApp to send”, the draft is included in the WhatsApp link and
        shared with WhatsApp. The link may appear in your browser history. You decide whether to
        send it. Please avoid including passwords, payment details or other sensitive information.
      </p>
      <h2>When you contact us</h2>
      <p>
        If you send an enquiry through WhatsApp or email, D-Kell Systems receives the information
        through that service and uses it to discuss your request and any agreed work. Those messages
        are separate from this website. Ask us if you want to discuss access to, correction of or
        deletion of information you have shared.
      </p>
      <h2>Cookies, analytics &amp; fonts</h2>
      <p>
        This website does not use analytics, advertising trackers, tracking cookies or local
        storage. The font and images are served with the site, so your browser does not contact
        Google Fonts.
      </p>
      <h2>Hosting and external services</h2>
      <p>
        In local preview, the site is served from your computer. If published on Firebase Hosting,
        Google will deliver the site and may process technical request information, such as IP
        addresses, under its own policies. No Firebase database or login service is used by this
        version.
      </p>
      <p>
        WhatsApp, Instagram and your email provider operate under their own privacy terms when you
        use them. Their sites are not embedded here.
      </p>
      <h2>Questions</h2>
      <p>
        Contact D-Kell Systems at
        <a :href="'mailto:' + business.contact.emailSupplied">{{
          business.contact.emailSupplied
        }}</a>
        or on <a :href="business.contact.whatsappUrl">WhatsApp</a> with any questions about
        information you have shared.
      </p>
    </article>
  </div>
</template>
