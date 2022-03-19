import { FC, ComponentType } from 'react';

import Shell from '~/components/Shell';

export function withShell<T>(Content: ComponentType<T>): FC<T> {
  return function ShellContent(props: T) {
    return (
      <Shell>
        <Content {...props} />
      </Shell>
    );
  };
}
