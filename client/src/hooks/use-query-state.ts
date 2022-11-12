import { useMemo, useCallback } from 'react';
import qs from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

import { PrimitiveDataType } from '~/types';

export type UseQueryStateSetterFunctionType<T = any> = (prev: T) => T;
export type UseQueryStateSetterType<T = any> =
  | T
  | UseQueryStateSetterFunctionType<T>;

/**
 * Shared state between query variable in the URL
 *
 * @param key - query string key
 * @param defaultValue - default value if the value in qs doesn't exist
 * @returns hooks
 */
export function useQueryState<T extends PrimitiveDataType>(
  key: string,
  defaultValue: T,
): [T, (val: UseQueryStateSetterType<T>) => any] {
  const navigate = useNavigate();
  const location = useLocation();

  const value = useMemo<T>(() => {
    const parsedSearch = qs.parse(location.search, {
      parseBooleans: true,
      parseNumbers: true,
    });
    return (parsedSearch[key] as T) || defaultValue;
  }, [location]);

  const setValue = useCallback((arg: UseQueryStateSetterType<T>) => {
    if (typeof arg === 'function') arg = arg(value);

    // get current location info
    const pathname = location.pathname;
    const parsedSearch = qs.parse(location.search);
    // replace previous value
    if (!arg) delete parsedSearch[key];
    else parsedSearch[key] = `${arg}`;
    // parse obj to query string
    const search = qs.stringify(parsedSearch);

    navigate({ pathname, search });
  }, []);

  return [value, setValue];
}
