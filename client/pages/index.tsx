import React from 'react';
import Link from 'next/link';

import { Center, Button, Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <Center h="100vh">
      <Flex flexDirection="column" minWidth={200}>
        <Link href={'/login'}>
          <Button colorScheme="teal" my={3} variant="solid">
            Login
          </Button>
        </Link>
        <Link href={'/signup'}>
          <Button colorScheme="purple" my={3} variant="outline">
            Sign Up
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}
