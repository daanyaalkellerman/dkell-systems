<script setup lang="ts">
import { clients } from '~/data/business'
usePageSeo(
  'Our Work',
  'Explore client work from D-Kell Systems, including a preview of the Gemsbyw homepage.',
)
</script>
<template>
  <div>
    <PageIntro
      eyebrow="Our Work"
      title="Our clients."
      description="A look at the websites and technology D-Kell Systems works on for small businesses."
    /><ClientBanner :clients="clients" />
    <section class="shell section-space" aria-labelledby="gemsbyw-heading">
      <div class="section-heading">
        <p class="eyebrow">Featured client</p>
        <h2 id="gemsbyw-heading">Gemsbyw</h2>
        <p>A preview of the desktop homepage.</p>
      </div>
      <figure class="project-preview">
        <a
          href="/clients/gemsbyw/homepage-desktop.png"
          aria-label="View the full-size Gemsbyw homepage screenshot"
        >
          <img
            src="/clients/gemsbyw/homepage-desktop.png"
            alt="Desktop homepage with jewellery photography and collection navigation"
            width="1351"
            height="621"
            loading="lazy"
            decoding="async"
          />
        </a>
        <figcaption>
          Gemsbyw · Desktop homepage. Select the image to view it at full size.
        </figcaption>
      </figure>
    </section>
    <ContactCta />
  </div>
</template>

<style scoped>
.project-preview {
  margin: 0;
}
.project-preview a {
  display: block;
  border: 1px solid var(--colour-sage, #a8bfa3);
  border-radius: 16px;
  overflow: hidden;
}
.project-preview img {
  display: block;
  width: 100%;
  height: auto;
}
.project-preview figcaption {
  margin-top: 16px;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
