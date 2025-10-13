import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'groupCoachingSettings',
  title: 'Group Coaching Settings',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'programDurationDisplay',
      title: 'Program Duration (English)',
      type: 'string',
      placeholder: '8 Weeks',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "8 Weeks", "10 Weeks", "2 Months"',
    }),
    defineField({
      name: 'priceDisplay',
      title: 'Price Display (English)',
      type: 'string',
      placeholder: '$300',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "$300", "300$", "$300 USD"',
    }),
    defineField({
      name: 'paymentPlansText',
      title: 'Payment Plans Text (English)',
      type: 'string',
      placeholder: 'Payment plans available',
      description: 'e.g., "Payment plans available", "Flexible payment options"',
    }),
    defineField({
      name: 'nextCohortDisplay',
      title: 'Next Cohort Date (English)',
      type: 'string',
      placeholder: 'March 15th',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "March 15th", "Starting January 10"',
    }),
    defineField({
      name: 'spotsDisplay',
      title: 'Available Spots (English)',
      type: 'string',
      placeholder: 'Only 12 spots available',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Only 12 spots available", "12 spots left"',
    }),
    defineField({
      name: 'isAcceptingEnrollment',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide enrollment button',
    }),
    
    // French Translation
    defineField({
      name: 'programDurationDisplayFr',
      title: 'Program Duration (French)',
      type: 'string',
      placeholder: '8 Semaines',
    }),
    defineField({
      name: 'priceDisplayFr',
      title: 'Price Display (French)',
      type: 'string',
      placeholder: '300'
    }),
    defineField({
      name: 'paymentPlansTextFr',
      title: 'Payment Plans Text (French)',
      type: 'string',
      placeholder: 'Plans de paiement disponibles',
    }),
    defineField({
      name: 'nextCohortDisplayFr',
      title: 'Next Cohort Date (French)',
      type: 'string',
      placeholder: '15 mars',
    }),
    defineField({
      name: 'spotsDisplayFr',
      title: 'Available Spots (French)',
      type: 'string',
      placeholder: 'Seulement 12 places disponibles',
    }),
    
    // Arabic Translation
    defineField({
      name: 'programDurationDisplayAr',
      title: 'Program Duration (Arabic)',
      type: 'string',
      placeholder: '8 أسابيع',
    }),
    defineField({
      name: 'priceDisplayAr',
      title: 'Price Display (Arabic)',
      type: 'string',
      placeholder: '300 دولار',
    }),
    defineField({
      name: 'paymentPlansTextAr',
      title: 'Payment Plans Text (Arabic)',
      type: 'string',
      placeholder: 'خطط دفع مرنة متاحة',
    }),
    defineField({
      name: 'nextCohortDisplayAr',
      title: 'Next Cohort Date (Arabic)',
      type: 'string',
      placeholder: '15 مارس',
    }),
    defineField({
      name: 'spotsDisplayAr',
      title: 'Available Spots (Arabic)',
      type: 'string',
      placeholder: '12 مقعداً فقط متاح',
    }),
  ],
  preview: {
    select: {
      duration: 'programDurationDisplay',
      date: 'nextCohortDisplay',
      spots: 'spotsDisplay',
      isActive: 'isAcceptingEnrollment',
    },
    prepare({ duration, date, spots, isActive }) {
      return {
        title: 'Group Coaching Program',
        subtitle: `${duration} • Starts ${date} • ${spots} ${isActive ? '✅ Visible' : '❌ Hidden'}`,
      }
    },
  },
})