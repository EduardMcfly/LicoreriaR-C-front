import React from 'react';
import { ApolloQueryResult, QueryResult } from '@apollo/client';

import { useProducts as useProductsBase } from 'graphqlAPI';
import { QueryProductsArgs } from '../../graphqlAPI/types-graphql';
import { TDataProducts } from '../../graphqlAPI/products/index';
import { mergeDeep } from '@apollo/client/utilities';

interface ProductsPropsBase {
  variables?: QueryProductsArgs;
}

type ProductsProps = Pick<
  QueryResult<TDataProducts, QueryProductsArgs>,
  'data' | 'loading'
> & {
  fetchMore: () =>
    | Promise<void | ApolloQueryResult<TDataProducts>>
    | undefined;
};

const ProductsContext = React.createContext<ProductsProps>(
  Object.create(null),
);

export const ProductsProvider = ({
  children,
  variables: variablesBase,
}: React.PropsWithChildren<ProductsPropsBase>) => {
  const variables = mergeDeep<QueryProductsArgs[]>(
    { pagination: { limit: 10 } },
    {
      ...variablesBase,
    },
  );
  const { data, fetchMore, ...rest } = useProductsBase({ variables });
  const [loading, setLoading] = React.useState(false);

  const cursor = React.useMemo(() => data?.products.cursor, [data]);

  const fetchMoreProducts = React.useCallback(() => {
    const after = cursor?.after;
    if (after) {
      setLoading(true);
      return fetchMore({
        variables: mergeDeep(variables, {
          pagination: { after },
        }),
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const { products } = {
            ...fetchMoreResult,
          };
          const prevBovines = prev.products.data || [];
          const newBovines = products.data || [];
          return {
            ...fetchMoreResult,
            products: {
              ...products,
              data: [...prevBovines, ...newBovines],
            },
          };
        },
      })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => setLoading(false));
    }
  }, [fetchMore, cursor, variables]);
  const allLoading = loading || rest.loading;
  return (
    <ProductsContext.Provider
      value={{
        data,
        loading: allLoading,
        fetchMore: fetchMoreProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const ProductsConsumer = ProductsContext.Consumer;
export const useProducts = () => React.useContext(ProductsContext);
