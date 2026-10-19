import { services, business } from '../data/business'
export interface Enquiry {
  name: string
  businessName: string
  service: string
  description: string
  budget: string
  timing: string
}
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>
export const serviceOptions = [
  ...services.map(({ slug, name }) => ({ value: slug, label: name })),
  { value: 'maintenance', label: 'Maintenance & support' },
]
export function selectedService(value: unknown): string {
  return typeof value === 'string' && serviceOptions.some((item) => item.value === value)
    ? value
    : ''
}
export function validateEnquiry(form: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  else if (form.name.trim().length > 100) errors.name = 'Keep your name to 100 characters or fewer.'
  if (!form.businessName.trim())
    errors.businessName =
      'Please enter your business name, or say that you are starting a business.'
  else if (form.businessName.trim().length > 150)
    errors.businessName = 'Keep the business name to 150 characters or fewer.'
  if (form.service && !serviceOptions.some((item) => item.value === form.service))
    errors.service = 'Please choose a listed service.'
  if (form.description.trim().length < 10)
    errors.description = 'Tell us a little more about your project (at least 10 characters).'
  else if (form.description.trim().length > 1500)
    errors.description = 'Keep the project description to 1,500 characters or fewer.'
  if (form.budget.trim().length > 100) errors.budget = 'Keep the budget to 100 characters or fewer.'
  if (form.timing.trim().length > 100) errors.timing = 'Keep the timing to 100 characters or fewer.'
  return errors
}
export function buildMessage(form: Enquiry): string {
  return [
    'Hello D-Kell Systems, I would like to discuss a project.',
    'Name: ' + form.name.trim(),
    'Business: ' + form.businessName.trim(),
    'Service: ' +
      (serviceOptions.find((item) => item.value === form.service)?.label ||
        'I would like some guidance'),
    'Project: ' + form.description.trim(),
    form.budget.trim() ? 'Budget: ' + form.budget.trim() : '',
    form.timing.trim() ? 'Timing: ' + form.timing.trim() : '',
  ]
    .filter(Boolean)
    .join('\n\n')
}
export function enquiryUrl(form: Enquiry): string {
  return business.contact.whatsappUrl + '?text=' + encodeURIComponent(buildMessage(form))
}
