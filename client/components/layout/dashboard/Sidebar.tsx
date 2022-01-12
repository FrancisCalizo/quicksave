import React from 'react';
import NextLink from 'next/link';

import { Flex, Link, Heading, Box } from '@chakra-ui/react';

import { SIDEBAR_LINKS } from 'utils/routes';

export default function Sidebar() {
  return (
    <Flex
      w={['100%', '100%', '10%', '10%', '10%']}
      direction="column"
      justify="space-between"
      align="center"
      bgGradient="linear(to-b, green.500, green.400)"
      color="#fff"
      py={4}
    >
      <Heading as="h3" fontSize={['3xl', '3xl', '2xl']}>
        QuickSave.
      </Heading>

      <Flex direction="column" w="100%">
        {SIDEBAR_LINKS.map((link, key) => (
          <Link key={key} m={5} as={NextLink} href={link.route}>
            <Box
              as="button"
              py={3}
              w="100%"
              textAlign="left"
              _hover={{ bg: 'green.600' }}
            >
              {link.title}
            </Box>
          </Link>
        ))}
      </Flex>

      <div />
    </Flex>
  );
}
