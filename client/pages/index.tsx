import NextLink from 'next/link';

import { Button, Center, Link } from '@chakra-ui/react';

export default function Home() {
  return (
    <Center h="100vh">
      <Link as={NextLink} href={'/dashboard'}>
        <Button colorScheme="green">Go to Dashboard</Button>
      </Link>
    </Center>
  );
}
