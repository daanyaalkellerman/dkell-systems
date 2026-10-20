<script setup lang="ts">
import { business } from '~/data/business'
</script>
<template>
  <section class="hero shell" aria-labelledby="hero-title">
    <RevealBlock class="hero-copy">
      <p class="eyebrow">D-Kell Systems · South Africa &amp; beyond</p>
      <h1 id="hero-title">Websites &amp; business systems <span>for small businesses.</span></h1>
      <p class="intro">
        From your first website to the tools behind your day-to-day work. We design and build around
        what your business needs.
      </p>
      <div class="hero-actions">
        <a :href="business.contact.whatsappUrl" class="button"
          >Discuss your project
          <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span></a
        ><NuxtLink class="text-link" to="/services"
          >Explore services <span aria-hidden="true"><SiteIcon name="arrow-right" /></span
        ></NuxtLink>
      </div>
    </RevealBlock>
    <RevealBlock>
      <figure
        class="connected-visual"
        aria-label="Illustrative website, administration and booking concepts"
      >
        <div class="visual-orbit" aria-hidden="true"></div>
        <div class="concept-window concept-website">
          <div class="window-bar">
            <span class="window-dots" aria-hidden="true"><SiteIcon name="dots" /></span
            ><span>YOUR BUSINESS / WEBSITE</span
            ><span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span>
          </div>
          <div class="website-content">
            <div>
              <span class="visual-kicker">Your business online</span>
              <h2>Products.<br />Services.<br />Enquiries.</h2>
              <span class="illustrated-button"
                >Explore <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span
              ></span>
            </div>
            <div class="product-scene" aria-hidden="true">
              <span class="product-arch"></span><span class="product-ring"></span
              ><span class="product-plinth"></span>
            </div>
          </div>
          <div class="website-bottom">
            <span>A place to discover your business</span><span aria-hidden="true">01 — 03</span>
          </div>
        </div>
        <div class="concept-window concept-admin">
          <span class="visual-kicker">Administration</span>
          <h3>Everything in view.</h3>
          <div class="record-row">
            <span class="record-icon" aria-hidden="true"><SiteIcon name="admin-platforms" /></span>
            <div>Customer records<small>Organised in one place</small></div>
          </div>
          <div class="record-row">
            <span class="record-icon" aria-hidden="true"><SiteIcon name="arrow-up-right" /></span>
            <div>Follow-up tasks<small>Clear next steps</small></div>
          </div>
          <div class="admin-footer">
            <span>Connected workflows</span
            ><span aria-hidden="true"><SiteIcon name="check" /></span>
          </div>
        </div>
        <div class="concept-window concept-booking">
          <span class="booking-icon" aria-hidden="true"><SiteIcon name="booking-systems" /></span>
          <div>
            <span class="visual-kicker">Booking system</span>
            <h3>Choose a time.</h3>
            <div class="time-options"><span>09:00</span><span>10:30</span><span>14:00</span></div>
          </div>
        </div>
        <figcaption>Illustrative concepts — every project is scoped for your business.</figcaption>
      </figure>
    </RevealBlock>
  </section>
</template>
