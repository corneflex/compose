import { Button } from '@corneflex/compose-ui';
import React from 'react';
import { useFederatedComponent } from '@corneflex/compose-core';

export const App: React.FC = () => {
  const { Component: RemoteComponent, errorLoading } = useFederatedComponent(
    'http://localhost:3002/remoteEntry.js',
    'composePlugin',
    './Widget',
  );
  return (
    <React.Suspense fallback="Loading System">
      {errorLoading ? 'Error loading module' : RemoteComponent && <RemoteComponent />}
    </React.Suspense>
  );
};
