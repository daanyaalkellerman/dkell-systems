import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ClientBanner from '../../app/components/ClientBanner.vue'
import type { Client } from '../../app/data/business'
const client: Client = {
  name: 'Gemsbyw',
  logoPath: '/clients/gemsbyw-logo.png',
  projectDetails: null,
  testimonial: null,
}
describe('client banner', () => {
  it('shows a single client once without navigation', () => {
    const wrapper = mount(ClientBanner, { props: { clients: [client] } })
    expect(wrapper.findAll('img')).toHaveLength(1)
    expect(wrapper.find('img').attributes('alt')).toBe('Gemsbyw')
    expect(wrapper.findAll('button')).toHaveLength(0)
  })
  it('supports manually controlled navigation for multiple clients', async () => {
    const wrapper = mount(ClientBanner, {
      props: { clients: [client, { ...client, name: 'Test fixture', logoPath: null }] },
    })
    await wrapper.get('button[aria-label="Next client"]').trigger('click')
    expect(wrapper.text()).toContain('Test fixture')
    expect(wrapper.text()).toContain('2 of 2')
    await wrapper.get('button[aria-label="Previous client"]').trigger('click')
    expect(wrapper.get('img').attributes('alt')).toBe('Gemsbyw')
  })
  it('handles an empty clients array', () => {
    expect(
      mount(ClientBanner, { props: { clients: [] } })
        .find('section')
        .exists(),
    ).toBe(false)
  })
})
