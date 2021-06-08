import { TDataProducts } from 'graphqlAPI';

import Product from './Product';

interface ProductsProps {
  data?: TDataProducts;
}

export const Products = ({ data }: ProductsProps) => {
  const products = data?.products.data;
  return (
    <>
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </>
  );
};

export default Products;
