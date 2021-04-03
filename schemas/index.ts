import { createSchema } from '@keystone-next/keystone/schema';

import { User } from './User';
import { Product } from './Product';
import { ProductImage } from './ProductImage';
import { CartItem } from './CartItem';

const lists = createSchema({
  User,
  Product,
  ProductImage,
  CartItem,
});

export default lists
