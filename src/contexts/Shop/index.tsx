import React from 'react';

interface Item {
  id: number;
  amount: number;
}

interface ShopPropsBase {}

interface ShopProps extends ShopPropsBase {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  addItem: (item: Item) => void;
}

const ShopContext = React.createContext<ShopProps>(
  Object.create(null),
);

export const ShopProvider = ({
  children,
}: React.PropsWithChildren<
  ShopPropsBase & { isCreating?: boolean }
>) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const addItem = (item: Item) => {
    const newItems = [item, ...items].reduce<Record<string, Item>>(
      (previousValue, currentValue) => {
        const { id, amount } = currentValue;
        if (previousValue[id]) previousValue[id].amount += amount;
        else previousValue[id] = currentValue;
        return previousValue;
      },
      {},
    );
    setItems(Object.values(newItems));
  };
  console.log(items);

  return (
    <ShopContext.Provider value={{ items, setItems, addItem }}>
      {children}
    </ShopContext.Provider>
  );
};
export const ShopConsumer = ShopContext.Consumer;
export const useShop = () => React.useContext(ShopContext);
