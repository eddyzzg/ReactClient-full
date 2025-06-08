import React, { useState, useCallback, type ReactNode } from 'react';
import type { FC } from 'react';
import { FullPageLoader } from './FullPageLoader';

interface UseFullPageLoader {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  LoaderComponent: ReactNode;
}

export function useFullPageLoader(): UseFullPageLoader {
  const [loading, setLoading] = useState(false);
  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  const LoaderComponent = loading ? <FullPageLoader /> : null;

  return { loading, showLoader, hideLoader, LoaderComponent };
}
