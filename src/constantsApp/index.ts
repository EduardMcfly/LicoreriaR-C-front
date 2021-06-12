import { stringify, ParsedUrlQueryInput } from 'querystring';
import { generatePath } from 'react-router';

export const AppName = process.env.REACT_APP_NAME;
export const PhoneNumber = process.env.REACT_APP_PHONE;
if (!PhoneNumber) {
  console.warn('REACT_APP_PHONE is required');
}

export enum PathRoutes {
  LANDING = '/landing',
  ROOT = '/',
  ORDER = '/order/:id',
}

type Format =
  | 'heic'
  | 'heif'
  | 'jpeg'
  | 'jpg'
  | 'png'
  | 'raw'
  | 'tiff'
  | 'webp';

interface PropsResize extends ParsedUrlQueryInput {
  format?: Format;
  width?: number;
  height?: number;
}

const { REACT_APP_IMAGE } = process.env;

export const createAPIImageRoute = (
  path: string,
  { width = 300, ...rest }: PropsResize = {},
): string => {
  /**
   * if exist in path remove ?
   **/
  path = path.replace(/\?$/gm, '');
  return `${REACT_APP_IMAGE}?file=${path}&${stringify({
    width,
    ...rest,
  })}`;
};

export type RecordRoute<K extends keyof any> = Record<K, string>;

export type RouteOrderProps = RecordRoute<'id'>;
export const createRouteOrder = (params: RouteOrderProps) =>
  generatePath(PathRoutes.ORDER, params);
