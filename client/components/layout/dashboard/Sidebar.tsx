import React from 'react';
import { Flex } from '@chakra-ui/react';

export default function Sidebar() {
  return (
    <Flex
      w={['100%', '100%', '10%', '15%', '15%']}
      flexDir="column"
      alignItems="center"
      bgGradient="linear(to-b, green.500, green.400)"
      color="#fff"
    >
      <h3>Sidebar coming soon...</h3>
    </Flex>
  );
}
