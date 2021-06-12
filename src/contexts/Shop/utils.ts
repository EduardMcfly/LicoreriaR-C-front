import { UserMap, CartProductBase, CartProduct } from './types';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInDays from 'date-fns/differenceInDays';
import addMinutes from 'date-fns/addMinutes';
import isBefore from 'date-fns/isBefore';

import { minDeliveryTime } from './constants';

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

export function getNewHour(value: string, newDate: Date) {
  const formatTime = 'HH:mm';
  const minDate = new Date().setHours(0, 0, 0, 0);
  const someDay = !differenceInDays(newDate, minDate);
  if (someDay) {
    const min = addMinutes(new Date(), minDeliveryTime);
    return isBefore(parse(value, formatTime, min), min)
      ? format(min, formatTime)
      : value;
  }
  return value;
}
