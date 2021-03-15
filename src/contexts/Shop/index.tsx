import React from 'react';

interface Item {
  id: number;
  amount: number;
}

interface ShopPropsBase {}

interface ShopProps extends ShopPropsBase {
  products: Item[];
  setProducts: React.Dispatch<React.SetStateAction<Item[]>>;
  addProduct: (item: Item) => void;
}

const ShopContext = React.createContext<ShopProps>(
  Object.create(null),
);

export const ShopProvider = ({
  children,
}: React.PropsWithChildren<
  ShopPropsBase & { isCreating?: boolean }
>) => {
  const [products, setProducts] = React.useState<Item[]>([]);
  const addProduct = (item: Item) => {
    const newItems = [item, ...products].reduce<Record<string, Item>>(
      (previousValue, currentValue) => {
        const { id, amount } = currentValue;
        if (previousValue[id]) previousValue[id].amount += amount;
        else previousValue[id] = currentValue;
        return previousValue;
      },
      {},
    );
    setProducts(Object.values(newItems));
  };

  return (
    <ShopContext.Provider
      value={{ products, setProducts, addProduct }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export const ShopConsumer = ShopContext.Consumer;
export const useShop = () => React.useContext(ShopContext);
