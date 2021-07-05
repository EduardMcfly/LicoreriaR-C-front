import { UserMap, CartProductBase, CartProduct } from './types';
import set from 'date-fns/set';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInDays from 'date-fns/differenceInDays';
import addMinutes from 'date-fns/addMinutes';
import isBefore from 'date-fns/isBefore';

import { Order } from 'graphqlAPI';
import { minDeliveryTime, dateFormat } from './constants';

const min = 0;
export const getValidAmount = (amount: number) =>
  amount < min ? min : amount;

const keyStorage = 'products';

export const getStorage = () => {
  try {
    const products: CartProductBase[] = JSON.parse(
      localStorage.getItem(keyStorage) || '',
    );
    return products;
  } catch (error) {
    return [];
  }
};

export const setStorage = (products: CartProduct[]) => {
  localStorage.setItem(
    keyStorage,
    JSON.stringify(
      products.map<CartProductBase>(({ id, amount }) => ({
        id,
        amount,
      })),
    ),
  );
};

const keyOrders = 'orders';

export const getOrders = () => {
  try {
    const products: Order[] = JSON.parse(
      localStorage.getItem(keyOrders) || '',
    );
    return products;
  } catch (error) {
    return [];
  }
};

export const setOrders = (orders: Order[]) => {
  localStorage.setItem(
    keyOrders,
    JSON.stringify(orders.map<Order['id']>(({ id }) => id)),
  );
};

const keyStorageMap = 'map';
export const getStorageMap = () => {
  const defaultUserMap: UserMap = {
    defaultCenter: {
      lat: 5.500919531940738,
      lng: -73.85196563119278,
    },
  };
  try {
    const userMap: UserMap = JSON.parse(
      localStorage.getItem(keyStorageMap) || '',
    );
    return { ...defaultUserMap, userMap };
  } catch (error) {
    return defaultUserMap;
  }
};
export const setStorageMap = (userMap: UserMap) => {
  localStorage.setItem(keyStorageMap, JSON.stringify(userMap));
};

export const getMinDateTime = () =>
  addMinutes(
    set(new Date(), { milliseconds: 0, seconds: 0 }),
    minDeliveryTime,
  );

const formatTime = 'HH:mm';

export function getNewDate(newDate: Date) {
  const minDate = getMinDateTime();
  return isBefore(newDate, minDate) ? newDate : minDate;
}

export function getNewHour(value?: string, newDate?: string | Date) {
  const minDate = getMinDateTime();
  if (!value) value = format(minDate, formatTime);
  if (!newDate) newDate = minDate;
  const someDay = !differenceInDays(
    newDate instanceof Date
      ? newDate
      : parse(newDate, dateFormat, new Date()),
    minDate,
  );
  if (someDay) {
    const min = minDate;
    return isBefore(parse(value, formatTime, min), min)
      ? format(min, formatTime)
      : value;
  }
  return value;
}
