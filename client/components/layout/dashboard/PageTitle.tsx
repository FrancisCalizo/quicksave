import React from 'react';

import { Heading, Text } from '@chakra-ui/react';

interface PageTitleProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export default function PageTitle(props: PageTitleProps) {
  const { title, description } = props;

  return (
    <div>
      <Heading as="h2" size="lg">
        {title}
      </Heading>

      <Text color="blackAlpha.600">{description}</Text>
    </div>
  );
}
