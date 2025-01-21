// schemas/product.js
export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'discountPercent',
        title: 'Discount Percent',
        type: 'number',
      },
      {
        name: 'isNew',
        title: 'Is New',
        type: 'boolean',
      },
      {
        name: 'colors',
        title: 'Colors',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'sizes',
        title: 'Sizes',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image', // This should match the data structure you're sending
        options: {
          hotspot: true, // Optional, for cropping
        },
      },
    ],
  };
  