export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  products: ProductConnection;
  product: Product;
  cartProducts: Array<Product>;
  cartProduct: Product;
};


export type QueryProductsArgs = {
  pagination?: Maybe<Pagination>;
  category?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryCartProductsArgs = {
  products: Array<Scalars['ID']>;
};


export type QueryCartProductArgs = {
  product: Scalars['ID'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  data: Array<Product>;
  cursor: PageInfo;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  price: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  creationDate: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type PageInfo = {
  __typename?: 'PageInfo';
  after?: Maybe<Scalars['String']>;
  count: Scalars['Int'];
};

export type Pagination = {
  after?: Maybe<Scalars['String']>;
  direction?: Maybe<OrderTypes>;
  limit?: Maybe<Scalars['Int']>;
};

/** The basic directions */
export enum OrderTypes {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createProducts: Array<Product>;
  editProduct: Product;
  deleteProduct: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  product: ProductInput;
};


export type MutationCreateProductsArgs = {
  products: Array<ProductInput>;
};


export type MutationEditProductArgs = {
  product: ProductInput;
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};

export type ProductInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  amount: Scalars['Float'];
  image?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
};

