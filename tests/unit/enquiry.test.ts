import { describe, expect, it } from 'vitest'
import {
  buildMessage,
  enquiryUrl,
  selectedService,
  validateEnquiry,
  type Enquiry,
} from '../../app/utils/enquiry'
import { quoteLabel, services } from '../../app/data/business'
const valid: Enquiry = {
  name: 'Zoë & Ali',
  businessName: 'A+B / Studio',
  service: 'online-stores',
  description: 'A store for gifts & jewellery.\nPlease discuss delivery.',
  budget: '',
  timing: '',
}
describe('enquiries', () => {
  it('preserves special characters and line breaks through WhatsApp encoding', () => {
    const url = new URL(enquiryUrl(valid))
    expect(url.origin + url.pathname).toBe('https://wa.me/27680071963')
    expect(url.searchParams.get('text')).toBe(buildMessage(valid))
    expect(url.searchParams.size).toBe(1)
    expect(buildMessage(valid)).toContain('Service: Online stores')
    expect(buildMessage(valid)).not.toContain('Budget:')
  })
  it('validates required fields, whitespace, length and unsupported service values', () => {
    expect(validateEnquiry(valid)).toEqual({})
    expect(
      validateEnquiry({
        ...valid,
        name: '  ',
        businessName: '',
        description: 'short',
        service: '<script>',
      }),
    ).toHaveProperty('service')
    expect(
      Object.keys(validateEnquiry({ ...valid, name: ' ', businessName: ' ', description: ' ' })),
    ).toEqual(['name', 'businessName', 'description'])
    expect(
      validateEnquiry({
        ...valid,
        description: 'a'.repeat(1501),
        budget: 'a'.repeat(101),
        timing: 'a'.repeat(101),
      }),
    ).toMatchObject({
      description: expect.any(String),
      budget: expect.any(String),
      timing: expect.any(String),
    })
  })
  it('only accepts known service slugs for preselection', () => {
    expect(selectedService('booking-systems')).toBe('booking-systems')
    expect(selectedService('maintenance')).toBe('maintenance')
    expect(selectedService('unknown')).toBe('')
    expect(selectedService(['websites'])).toBe('')
  })
  it('includes optional details only when supplied', () => {
    expect(buildMessage({ ...valid, budget: ' Discuss ', timing: ' November ' })).toContain(
      'Budget: Discuss\n\nTiming: November',
    )
  })
})
describe('pricing', () => {
  it('keeps absent prices honest and supports configured currency amounts', () => {
    expect(quoteLabel(services[0]!)).toBe('Request a quote')
    expect(quoteLabel({ ...services[0]!, startingPrice: 1250, currency: 'ZAR' })).toMatch(
      /From R.*1.*250/,
    )
    expect(quoteLabel({ ...services[0]!, startingPrice: 0 })).toMatch(/From R.*0/)
  })
})
