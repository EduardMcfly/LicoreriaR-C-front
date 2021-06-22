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

export type After = {
  __typename?: 'After';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};

export type AfterInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Product>>;
};

export type CategoryInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createProducts: Array<Product>;
  editProduct: Product;
  deleteProduct: Scalars['Boolean'];
  createCategory: Category;
  createCategories: Array<Order>;
  editCategory: Category;
  deleteCategory: Scalars['Boolean'];
  createOrder: Order;
  editOrder: Order;
  addProductOrder: Order;
  editProductOrder: Order;
  deleteProductOrder: Order;
  deleteOrder: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  product: ProductInput;
};


export type MutationCreateProductsArgs = {
  products: Array<ProductInput>;
};


export type MutationEditProductArgs = {
  product: ProductEditInput;
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  category: CategoryInput;
};


export type MutationCreateCategoriesArgs = {
  orders: Array<OrderInput>;
};


export type MutationEditCategoryArgs = {
  product: CategoryInput;
  id: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  products: Array<ProductOrderInput>;
  client: Scalars['String'];
  location: OrderLocationInput;
  orderDate: Scalars['DateTime'];
  deliveryDate?: Maybe<Scalars['DateTime']>;
};


export type MutationEditOrderArgs = {
  product: OrderInputEdit;
  id: Scalars['ID'];
};


export type MutationAddProductOrderArgs = {
  product: ProductOrderInput;
  id: Scalars['ID'];
};


export type MutationEditProductOrderArgs = {
  unitPrice: Scalars['Float'];
  amount: Scalars['Int'];
  product: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationDeleteProductOrderArgs = {
  product: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  client: Scalars['String'];
  products: Array<ProductOrder>;
  location: OrderLocation;
  orderDate: Scalars['DateTime'];
  deliveryDate?: Maybe<Scalars['DateTime']>;
};

export type OrderInput = {
  products: Array<ProductOrderInput>;
  client: Scalars['String'];
  location: OrderLocationInput;
  orderDate: Scalars['DateTime'];
  deliveryDate?: Maybe<Scalars['DateTime']>;
};

export type OrderInputEdit = {
  client?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductOrderInput>>;
  location?: Maybe<OrderLocationInput>;
  orderDate?: Maybe<Scalars['DateTime']>;
  deliveryDate?: Maybe<Scalars['DateTime']>;
};

export type OrderLocation = {
  __typename?: 'OrderLocation';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type OrderLocationInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

/** The basic directions */
export enum OrderTypes {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  after?: Maybe<Scalars['String']>;
  arrayAfter?: Maybe<Array<Maybe<After>>>;
  count: Scalars['Int'];
};

export type Pagination = {
  after?: Maybe<Scalars['String']>;
  arrayAfter?: Maybe<Array<AfterInput>>;
  direction?: Maybe<OrderTypes>;
  limit?: Maybe<Scalars['Int']>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  price: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  creationDate: Scalars['DateTime'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  data: Array<Product>;
  cursor: PageInfo;
};

export type ProductEditInput = {
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  amount?: Maybe<Scalars['Float']>;
};

export type ProductInput = {
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  imageUrl?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  amount: Scalars['Float'];
};

export type ProductOrder = {
  __typename?: 'ProductOrder';
  id: Scalars['ID'];
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  unitPrice: Scalars['Int'];
};

export type ProductOrderInput = {
  id: Scalars['ID'];
  amount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  products: ProductConnection;
  product?: Maybe<Product>;
  categories: Array<Category>;
  category: Category;
  cartProducts: Array<Product>;
  cartProduct: Product;
  orders: Array<Order>;
  order?: Maybe<Order>;
};


export type QueryProductsArgs = {
  pagination?: Maybe<Pagination>;
  categories?: Maybe<Array<Scalars['String']>>;
  filter?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryCartProductsArgs = {
  products: Array<Scalars['ID']>;
};


export type QueryCartProductArgs = {
  product: Scalars['ID'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};

