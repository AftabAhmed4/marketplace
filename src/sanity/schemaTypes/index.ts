import { type SchemaTypeDefinition } from 'sanity'
import produt from './produt'
import user from './user'
import order from './order'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ 
    
    produt, user, order
    
    ],
}
