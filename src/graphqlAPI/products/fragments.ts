import { gql } from '@apollo/client';

export const productFragment = gql`
  fragment ProductFragment on Product {
    id
    name
    image
    description
    price
    amount
    categoryId
  }
`;
