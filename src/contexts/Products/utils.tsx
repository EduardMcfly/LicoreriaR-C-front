import { QueryProductsArgs } from '../../graphqlAPI/types-graphql';
import { TDataProducts } from '../../graphqlAPI/products/index';

export const getFilteredData = (
  data: TDataProducts | undefined,
  newFilter: QueryProductsArgs['filter'],
): TDataProducts | undefined => {
  const products = data?.products;
  if (products)
    return {
      ...data,
      products: {
        ...products,
        data: products.data.filter(({ name }) => {
          if (newFilter)
            return !!name
              .toLowerCase()
              .match(newFilter.toLowerCase());
          return false;
        }),
      },
    };
};
