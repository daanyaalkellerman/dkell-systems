import source from '../../project-brief/business-content.json'

export interface Service {
  slug: string
  name: string
  startingPrice?: number | null
  currency: string
  priceScope?: string
  planning: string
  description: string
  examples: string[]
}
export interface Client {
  name: string
  logoPath: string | null
  projectDetails: string | null
  testimonial: string | null
}
const details: Record<string, Pick<Service, 'description' | 'examples'>> = {
  websites: {
    description:
      'A clear home for your business online, with the information customers need to take the next step.',
    examples: ['Business websites', 'Service pages', 'Enquiry routes'],
  },
  'online-stores': {
    description:
      'Bring your products together in an online shop, whether you are starting out or selling through social media.',
    examples: ['Product catalogues', 'Shopping & checkout', 'Order management'],
  },
  'admin-platforms': {
    description:
      'A dedicated space to organise the day-to-day information and tasks behind your business.',
    examples: ['Customer records', 'Internal workflows', 'Business administration'],
  },
  automation: {
    description:
      'Connect repetitive steps in your workflow so there is less information to move by hand.',
    examples: ['Connected tools', 'Routine tasks', 'Notifications'],
  },
  'booking-systems': {
    description:
      'Help customers arrange a time with your business and keep appointments organised.',
    examples: ['Appointment booking', 'Availability', 'Booking management'],
  },
  'business-dashboards': {
    description:
      'Bring useful business information into one view so it is easier to understand and act on.',
    examples: ['Business overviews', 'Reporting', 'Data summaries'],
  },
}
export const business = source
const planning: Record<string, string> = {
  websites:
    'Think about the pages customers need, the content you have and the action you want visitors to take. Bring any existing branding, domain details and examples of sites you find useful.',
  'online-stores':
    'Start with your product range, the information you have for each item, and how you handle orders, delivery and payments. These choices shape the store and its integrations.',
  'admin-platforms':
    'Describe who needs access, the information they work with and the tasks they carry out. We can then discuss the workflow, permissions and data handling needed for your platform.',
  automation:
    'Identify a repetitive task, the tools involved and the rules it follows. Consider what should happen when a step fails or needs a person to review it.',
  'booking-systems':
    'Outline your services, appointment lengths, availability and cancellation process. Any payments, reminders or calendar integrations should be discussed as part of the scope.',
  'business-dashboards':
    'Choose the questions your dashboard should answer and where the information comes from. We can discuss how often data changes, who sees it and how it should be presented.',
}
export const services: Service[] = source.services.map((service) => ({
  ...service,
  ...details[service.slug]!,
  planning: planning[service.slug]!,
}))
export const clients: Client[] = source.clients.map((client) => ({
  ...client,
  logoPath: client.name === 'Gemsbyw' ? '/clients/gemsbyw-logo.png' : client.logoPath,
}))
export function quoteLabel(service: Service): string {
  return service.startingPrice == null
    ? 'Request a quote'
    : `From ${new Intl.NumberFormat('en-ZA', { style: 'currency', currency: service.currency, maximumFractionDigits: 0 }).format(service.startingPrice)}`
}
