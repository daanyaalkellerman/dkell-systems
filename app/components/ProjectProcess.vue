<script setup lang="ts">
const steps = [
  {
    title: 'Understand your business',
    text: 'Discuss your customers, current tools and the requirements that matter most.',
  },
  {
    title: 'Agree on scope & a quote',
    text: 'Define the work, responsibilities, cost and timing before development begins.',
  },
  {
    title: 'Design & develop',
    text: 'Review the design and working website or system, and give feedback as it takes shape.',
  },
  {
    title: 'Test, launch & hand over',
    text: 'Check the agreed features, prepare for launch and explain how to manage your solution.',
  },
  {
    title: 'Arrange ongoing support',
    text: 'Agree on any maintenance or further development your business needs.',
  },
]
</script>
<template>
  <section class="shell section-space" aria-labelledby="process-title">
    <RevealBlock class="section-heading">
      <div>
        <p class="eyebrow">The process</p>
        <h2 id="process-title">From first conversation<br />to handover.</h2>
      </div>
      <p>Start with what your business needs now, and leave room to develop it further.</p>
    </RevealBlock>
    <ol class="process-grid">
      <li v-for="(step, index) in steps" :key="step.title">
        <span>0{{ index + 1 }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </li>
    </ol>
  </section>
</template>
