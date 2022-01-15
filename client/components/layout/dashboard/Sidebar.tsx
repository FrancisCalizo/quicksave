import React from 'react';
import NextLink from 'next/link';

import { Flex, Link, Heading, Box, Text } from '@chakra-ui/react';

import { SIDEBAR_LINKS } from 'utils/routes';

export default function Sidebar() {
  return (
    <Flex
      w={['100%', '100%', '170px', '170px', '170px']}
      direction="column"
      align="center"
      bgGradient="linear(to-b, green.500, green.400)"
      color="#fff"
      py={4}
    >
      <Heading as="h3" fontSize={['3xl', '3xl', '2xl']} textAlign="left">
        QuickSave.
      </Heading>

      <Flex direction="column" w="100%" mt={6}>
        {SIDEBAR_LINKS.map((link, key) => {
          // https://stackoverflow.com/a/64277686
          const Icon = link.icon;

          return (
            <Link key={key} m={5} as={NextLink} href={link.route}>
              <Box
                as="button"
                py={1.5}
                w="100%"
                _hover={{ bg: 'green.600' }}
                display="flex"
                alignItems="center"
                pl={4}
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
