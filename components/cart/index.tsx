import { getCart } from 'lib/api';
import CartDetails from './cart-details';

export default async function Cart() {
  const {
    data: { cart }
  } = await getCart();

  if (!cart || !cart?.cart_items) return <p>No data</p>;

  return <CartDetails cart={cart} />;
}
