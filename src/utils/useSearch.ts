import { useLocation } from 'react-router-dom';
import qs from 'qs';

export function useSearch(): qs.ParsedQs {
  const { search } = useLocation();
  return qs.parse(search.replace(/\?/, '')) || {};
}
