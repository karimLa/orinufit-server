import { createSchema } from '@keystone-next/keystone/schema';

import { User } from './User';
import { Role } from './Role';
import { Product } from './Product';
import { ProductImage } from './ProductImage';
import { CartItem } from './CartItem';
import { Order } from './Order';
import { OrderItem } from './OrderItem';

const lists = createSchema({
  User,
  Role,
  Product,
  ProductImage,
  CartItem,
  Order,
  OrderItem,
});

export default lists
