<template>
  <section class="store-feature section-space" aria-labelledby="store-title">
    <div class="shell">
      <RevealBlock class="store-heading"
        ><p class="eyebrow">Websites &amp; online stores</p>
        <h2 id="store-title">A clear home<br />for your business online.</h2></RevealBlock
      >
      <div class="store-layout">
        <RevealBlock
          ><figure class="store-visual">
            <div class="store-browser">
              <div class="window-bar">
                <span class="window-dots" aria-hidden="true"><SiteIcon name="dots" /></span
                ><span>YOUR COLLECTION</span
                ><span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span>
              </div>
              <div class="store-browser-content">
                <span class="visual-kicker">Browse. Discover. Enquire.</span>
                <h3>A closer look<br />at what you offer.</h3>
                <div class="catalogue-products" aria-hidden="true">
                  <div><span class="vase vase-one"></span></div>
                  <div><span class="vase vase-two"></span></div>
                  <div><span class="vase vase-three"></span></div>
                </div>
                <div class="catalogue-labels">
                  <span>Product details</span><span>Clear categories</span
                  ><span>Easy enquiries</span>
                </div>
              </div>
            </div>
            <div class="store-phone" aria-hidden="true">
              <div class="phone-speaker"></div>
              <span>YOUR BUSINESS</span>
              <div class="phone-product"><span class="vase vase-two"></span></div>
              <strong>Product collection</strong>
              <div class="phone-line"></div>
              <div class="phone-line short"></div>
              <div class="phone-button">View product <SiteIcon name="arrow-up-right" /></div>
            </div>
            <figcaption>Illustrative website and store layouts.</figcaption>
          </figure></RevealBlock
        >
        <RevealBlock class="store-copy"
          ><h3>Make the next step easy to find.</h3>
          <p>
            Give visitors a useful introduction to your business, space to explore your products and
            a clear way to get in touch.
          </p>
          <p>
            Whether you sell through social media or already have a website, we can discuss the
            pages, product information and enquiry routes you need.
          </p>
          <div class="feature-links">
            <NuxtLink to="/services/websites"
              >Explore websites
              <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span></NuxtLink
            ><NuxtLink to="/services/online-stores"
              >Explore online stores
              <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span
            ></NuxtLink></div
        ></RevealBlock>
      </div>
    </div>
  </section>
</template>
