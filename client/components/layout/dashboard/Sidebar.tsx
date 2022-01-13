import React from 'react';
import NextLink from 'next/link';

import { Flex, Link, Heading, Box } from '@chakra-ui/react';

import { SIDEBAR_LINKS } from 'utils/routes';

export default function Sidebar() {
  return (
    <Flex
      w={['100%', '100%', '170px', '170px', '170px']}
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

      <Flex direction="column" w="100%" bg="green.300">
        {SIDEBAR_LINKS.map((link, key) => {
          // https://stackoverflow.com/a/64277686
          const Icon = link.icon;

          return (
            <Link key={key} m={5} as={NextLink} href={link.route}>
              <Box
                as="button"
                py={2}
                w="100%"
                textAlign="left"
                _hover={{ bg: 'green.600' }}
                display="flex"
                alignItems="center"
                pl={3}
              >
                <Icon
                  size="1.25em"
                  style={{ marginRight: 10, color: '#fff' }}
                />{' '}
                {link.title}
              </Box>
            </Link>
          );
        })}
      </Flex>

      <div />
    </Flex>
  );
}
