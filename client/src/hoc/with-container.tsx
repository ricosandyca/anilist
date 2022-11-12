import { FC, ComponentType } from 'react';
import { Container } from '@chakra-ui/react';
import { TOP_SHELL_HEIGHT } from '~/components/Shell/Shell';

export function withContainer<T>(
  Content: ComponentType<T>,
  addShellMargin = false,
): FC<T> {
  return function ContainerContent(props: T) {
    return (
      <Container
        maxW="container.xl"
        h="full"
        mt={addShellMargin ? TOP_SHELL_HEIGHT : 0}
      >
        <Content {...props} />
      </Container>
    );
  };
}
