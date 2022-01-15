import React from 'react';
import NextLink from 'next/link';

import { Flex, Link, Box, Text } from '@chakra-ui/react';

import { SIDEBAR_LINKS } from 'utils/routes';
import Logo from 'components/layout/Logo';

export default function Sidebar() {
  return (
    <Flex
      w={['100%', '100%', '200px', '200px', '200px']}
      direction="column"
      bgGradient="linear(to-b, green.500, green.400)"
      color="#fff"
      py={4}
    >
      <Logo />

      <Flex direction="column" w="100%" mt={6}>
        {SIDEBAR_LINKS.map((link, key) => {
          // https://stackoverflow.com/a/64277686
          const Icon = link.icon;

          return (
            <Link key={key} as={NextLink} href={link.route}>
              <Box
                pl={4}
                as="button"
                py={1.5}
                w="100%"
                _hover={{ bg: 'green.600' }}
                display="flex"
                alignItems="center"
              >
                <Icon
                  size="1.25em"
                  style={{ marginRight: 12, color: '#fff' }}
                />
                <Text fontSize="14px" fontWeight={600}>
                  {link.title}
                </Text>
              </Box>
            </Link>
          );
        })}
      </Flex>

      <div />
    </Flex>
  );
}
