import React from 'react';
import { useDynamicScript } from './useDynamicScript';

type Factory = () => any;

interface Container {
  init(shareScope: string): void;

  get(module: string): Factory;
}

// eslint-disable-next-line camelcase,no-underscore-dangle
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
// eslint-disable-next-line camelcase,no-underscore-dangle
declare const __webpack_share_scopes__: { default: string };

function loadComponent(
  scope: any,
  module: string,
): () => Promise<{ default: React.ComponentType<any> }> {
  return async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await __webpack_init_sharing__('default');
    const container: Container = window[scope] as any;

    // eslint-disable-next-line camelcase
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
}

const componentCache = new Map();
export const useFederatedComponent = (remoteUrl: string, scope: string, module: string) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState<React.LazyExoticComponent<
    React.ComponentType<any>
  > | null>(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};
