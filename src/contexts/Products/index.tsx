import React from 'react';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';

import { QueryProductsArgs } from '../../graphqlAPI/types-graphql';
import {
  TDataProducts,
  PRODUCTS_QUERY,
} from '../../graphqlAPI/products/index';
import { mergeDeep } from '@apollo/client/utilities';

interface ProductsPropsBase {
  variables?: QueryProductsArgs;
}

type ProductsProps = {
  data?: TDataProducts;
  loading: boolean;
  fetchMore: () =>
    | Promise<void | ApolloQueryResult<TDataProducts>>
    | undefined;
  variables: QueryProductsArgs;
  setVariables: React.Dispatch<
    React.SetStateAction<Partial<QueryProductsArgs>>
  >;
  cancel: () => void;
};

const ProductsContext = React.createContext<ProductsProps>(
  Object.create(null),
);

export const ProductsProvider = ({
  children,
  variables: variablesBase,
}: React.PropsWithChildren<ProductsPropsBase>) => {
  const client = useApolloClient();

  const [variables, setVariables] = React.useState(
    mergeDeep<QueryProductsArgs[]>(
      { pagination: { limit: 10 } },
      {
        ...variablesBase,
      },
    ),
  );

  interface State {
    loading: boolean;
    data?: TDataProducts;
  }

  const [{ loading, data }, setResultBase] = React.useState<State>({
    loading: true,
    data: undefined,
  });

  const setResult = React.useCallback(
    (action: React.SetStateAction<Partial<State>>) => {
      setResultBase((result) => {
        const newResult =
          typeof action === 'function' ? action(result) : action;
        return { ...result, ...newResult };
      });
    },
    [],
  );

  const getQuery = React.useCallback(
    () =>
      client.watchQuery<TDataProducts, QueryProductsArgs>({
        variables,
        query: PRODUCTS_QUERY,
      }),
    [client, variables],
  );

  const getFilteredData = React.useCallback(
    (
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
    },
    [],
  );

  React.useEffect(() => {
    if (variables.filter)
      setResult((result) => ({
        data: getFilteredData(result.data, variables.filter),
      }));
  }, [setResult, getFilteredData, variables.filter]);
  const subscribe = React.useRef<ZenObservable.Subscription>();

  React.useEffect(() => {
    setResult({
      loading: true,
    });
    if (subscribe.current) subscribe.current.unsubscribe();
    const query = getQuery();
    subscribe.current = query.subscribe(
      ({ data }) => {
        setResult({ data, loading: false });
      },
      () => {
        setResult({ loading: false });
      },
    );
    return () => {
      subscribe.current?.unsubscribe();
    };
  }, [variables, setResult, getQuery]);

  const cursor = React.useMemo(() => data?.products.cursor, [data]);

  const fetchMoreProducts = React.useCallback(() => {
    const after = cursor?.after;

    if (after) {
      setResult({ loading: true });
      const query = getQuery();
      const fetchMore = query.fetchMore.bind(query);
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
        .then(({ data }) => {
          setResult({ data, loading: false });
        })
        .catch((e) => {
          setResult({ loading: false });
        });
    }
  }, [setResult, getQuery, cursor, variables]);

  const allLoading = loading;

  return (
    <ProductsContext.Provider
      value={{
        data: data,
        loading: allLoading,
        fetchMore: fetchMoreProducts,
        variables,
        setVariables: (values) => {
          const newVariables = {
            ...variables,
            ...values,
          };
          setVariables(newVariables);
        },
        cancel: () => {
          subscribe.current?.unsubscribe();
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const ProductsConsumer = ProductsContext.Consumer;
export const useProducts = () => React.useContext(ProductsContext);
