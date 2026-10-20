<template>
  <section class="systems-feature section-space" aria-labelledby="systems-title">
    <div class="shell feature-split">
      <RevealBlock class="feature-copy"
        ><p class="eyebrow">Behind the scenes</p>
        <h2 id="systems-title">Tools for the work<br />behind your business.</h2>
        <p>
          Organise records, connect repetitive tasks and bring important information into view.
          Start with the workflow you want to improve.
        </p>
        <div class="feature-links">
          <NuxtLink to="/services/admin-platforms"
            >Admin platforms
            <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span></NuxtLink
          ><NuxtLink to="/services/automation"
            >Automation <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span></NuxtLink
          ><NuxtLink to="/services/business-dashboards"
            >Business dashboards <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span
          ></NuxtLink></div
      ></RevealBlock>
      <RevealBlock
        ><figure class="workflow-visual">
          <div class="workflow-top">
            <span class="visual-kicker">An example workflow</span
            ><span class="workflow-badge">From enquiry to overview</span>
          </div>
          <div class="workflow-step">
            <span class="workflow-number">01</span>
            <div>
              <h3>Keep a clear record</h3>
              <p>Customer details &amp; project information</p>
              <div class="record-preview">
                <span>Customer record</span><span>Project brief</span>
              </div>
            </div>
          </div>
          <div class="workflow-line" aria-hidden="true"></div>
          <div class="workflow-step">
            <span class="workflow-number">02</span>
            <div>
              <h3>Connect the next step</h3>
              <p>Move information between agreed tools</p>
              <div class="workflow-route">
                <span>Enquiry</span><span aria-hidden="true"><SiteIcon name="arrow-right" /></span
                ><span>Follow-up task</span>
              </div>
            </div>
          </div>
          <div class="workflow-line" aria-hidden="true"></div>
          <div class="workflow-step">
            <span class="workflow-number">03</span>
            <div>
              <h3>See what needs attention</h3>
              <p>A focused view of your business information</p>
              <div class="overview-bars" aria-hidden="true">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
            </div>
          </div>
          <figcaption>Illustrative workflow, not a live product or client data.</figcaption>
        </figure></RevealBlock
      >
    </div>
  </section>
</template>
