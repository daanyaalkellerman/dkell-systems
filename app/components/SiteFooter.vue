<script setup lang="ts">
import { business, services } from '~/data/business'
</script>
<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <div class="footer-brand">
          <NuxtLink to="/" class="brand" aria-label="D-Kell Systems home"
            ><img
              src="/brand/dkell-logo-horizontal-transparent-generated.png"
              alt="D-Kell Systems"
              width="2172"
              height="724"
              loading="lazy"
          /></NuxtLink>
          <p>Websites and business technology.<br />South Africa &amp; internationally.</p>
        </div>
        <nav aria-label="Footer services">
          <h2>Services</h2>
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="'/services/' + service.slug"
            >{{ service.name }}</NuxtLink
          >
        </nav>
        <nav aria-label="Footer company">
          <h2>Company</h2>
          <NuxtLink to="/about">About</NuxtLink><NuxtLink to="/work">Our Work</NuxtLink
          ><NuxtLink to="/contact">Contact</NuxtLink><NuxtLink to="/privacy">Privacy</NuxtLink>
        </nav>
        <nav aria-label="Footer contact">
          <h2>Get in touch</h2>
          <a :href="business.contact.whatsappUrl">WhatsApp <span aria-hidden="true">↗</span></a
          ><a
            v-if="business.contact.emailConfirmed"
            :href="'mailto:' + business.contact.emailSupplied"
            >{{ business.contact.emailSupplied }}</a
          ><a :href="business.contact.instagram">Instagram <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} D-Kell Systems</p>
        <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </div>
  </footer>
</template>
