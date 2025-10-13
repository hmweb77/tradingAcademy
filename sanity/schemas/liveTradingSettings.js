import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'liveTradingSettings',
  title: 'Live Trading Settings',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'sessionDaysDisplay',
      title: 'Session Days (English)',
      type: 'string',
      placeholder: 'Tuesday & Thursday',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Tuesday & Thursday", "Monday, Wednesday & Friday"',
    }),
    defineField({
      name: 'timeDisplay',
      title: 'Time Display (English)',
      type: 'string',
      placeholder: '9:30 AM - 11:30 AM EST',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "9:30 AM - 11:30 AM EST"',
    }),
    defineField({
      name: 'priceDisplay',
      title: 'Price Display (English)',
      type: 'string',
      placeholder: '$100',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "$100", "$100/month", "100$"',
    }),
    defineField({
      name: 'isAcceptingApplications',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide enrollment button',
    }),
    
    // French Translation
    defineField({
      name: 'sessionDaysDisplayFr',
      title: 'Session Days (French)',
      type: 'string',
      placeholder: 'Mardi et Jeudi',
    }),
    defineField({
      name: 'timeDisplayFr',
      title: 'Time Display (French)',
      type: 'string',
      placeholder: '9h30 - 11h30 EST',
    }),
    defineField({
      name: 'priceDisplayFr',
      title: 'Price Display (French)',
      type: 'string',
      placeholder: '100'
    }),
    
    // Arabic Translation
    defineField({
      name: 'sessionDaysDisplayAr',
      title: 'Session Days (Arabic)',
      type: 'string',
      placeholder: 'الثلاثاء والخميس',
    }),
    defineField({
      name: 'timeDisplayAr',
      title: 'Time Display (Arabic)',
      type: 'string',
      placeholder: '9:30 - 11:30 صباحاً بتوقيت نيويورك',
    }),
    defineField({
      name: 'priceDisplayAr',
      title: 'Price Display (Arabic)',
      type: 'string',
      placeholder: '100 دولار',
    }),
  ],
  preview: {
    select: {
      days: 'sessionDaysDisplay',
      time: 'timeDisplay',
      price: 'priceDisplay',
      isActive: 'isAcceptingApplications',
    },
    prepare({ days, time, price, isActive }) {
      return {
        title: 'Live Trading Sessions',
        subtitle: `${days} • ${time} • ${price} ${isActive ? '✅ Visible' : '❌ Hidden'}`,
      }
    },
  },
})