import { defineType, defineField } from 'sanity'
import { BookOpen } from '@sanity/icons'

export default defineType({
  name: 'freeResource',
  title: 'Free Resources',
  type: 'document',
  icon: BookOpen,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pagesDisplay',
      title: 'Pages Display',
      type: 'string',
      placeholder: '50 pages',
      validation: (Rule) => Rule.required(),
      description: 'How the page count appears (e.g., "50 pages", "25 pages")',
    }),
   
    defineField({
      name: 'image',
      title: 'Resource Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      validation: (Rule) => Rule.required(),
      description: 'Image displayed in the carousel (recommended: 400x250px)',
    }),
    defineField({
      name: 'features',
      title: 'Features (English)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
      description: 'Add features for this resource (recommanded 4)',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule) => Rule.required(),
      description: 'Upload the PDF that will be sent to users via email',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Order in carousel (1 = first, 2 = second, etc.)',
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this resource on the website',
    }),
    
    // French Translation
    defineField({
      name: 'titleFr',
      title: 'Title (French)',
      type: 'string',
    }),
    defineField({
      name: 'descriptionFr',
      title: 'Description (French)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pagesDisplayFr',
      title: 'Pages Display (French)',
      type: 'string',
      placeholder: '50 pages',
    }),
    defineField({
      name: 'featuresFr',
      title: 'Features (French)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
    }),
    
    // Arabic Translation
    defineField({
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'descriptionAr',
      title: 'Description (Arabic)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pagesDisplayAr',
      title: 'Pages Display (Arabic)',
      type: 'string',
      placeholder: '50 صفحة',
    }),
    defineField({
      name: 'featuresAr',
      title: 'Features (Arabic)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pagesDisplay',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, order, isActive }) {
      return {
        title: `${order}. ${title}`,
        subtitle: isActive ? `${subtitle} ✅ Active` : `${subtitle} ❌ Hidden`,
        media,
      }
    },
  },
})