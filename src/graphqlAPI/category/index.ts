import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { Query } from '../types-graphql';

export type TDataCategories = Pick<
  Query,
  'categories' | '__typename'
>;
export const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
      description
      image
    }
  }
`;

type UseCategoriesProps = QueryHookOptions<TDataCategories>;

export const useCategories = (props?: UseCategoriesProps) => {
  return useQuery<TDataCategories>(CATEGORIES_QUERY, props);
};
