import React from 'react';
import NextLink from 'next/link';

import { Flex, Link, Box, Text, useBreakpointValue } from '@chakra-ui/react';

import { SIDEBAR_LINKS } from 'utils/routes';
import Logo from 'components/layout/Logo';

export default function Sidebar() {
  // prettier-ignore
  const iconSize = useBreakpointValue({ sm: '1.25em', md: '1.75em', lg: '1.75em', xl: '1.25em', ['2xl']: '1.25em' });
  // prettier-ignore
  const iconMargin = useBreakpointValue({ sm: 12, md: 0, lg: 0, xl: 12, ['2xl']: 12, });

  return (
    <Flex
      w={['100%', '100%', '100px', '100px', '200px']}
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
                pl={[4, 4, 0, 0, 4]}
                as="button"
                py={[1.5, 1.5, 3, 3, 1.5]}
                w="100%"
                _hover={{ bg: 'green.600' }}
                display="flex"
                justifyContent={[
                  'flex-start',
                  'flex-start',
                  'center',
                  'center',
                  'flex-start',
                ]}
                alignItems="center"
              >
                <Icon
                  size={iconSize}
                  style={{ marginRight: iconMargin, color: '#fff' }}
                />
                <Text
                  fontSize="14px"
                  fontWeight={600}
                  display={['block', 'block', 'none', 'none', 'block']}
                >
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
