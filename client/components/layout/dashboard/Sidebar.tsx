import React from 'react';
import NextLink from 'next/link';

import {
  Flex,
  Link,
  Box,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { SIDEBAR_LINKS } from 'utils/routes';
import Logo from 'components/layout/Logo';

export default function Sidebar() {
  // prettier-ignore
  const iconSize = useBreakpointValue({ sm: '1.25em', md: '1.75em', lg: '1.75em', xl: '1.25em', ['2xl']: '1.25em' });
  // prettier-ignore
  const iconMargin = useBreakpointValue({ sm: 12, md: 0, lg: 0, xl: 12, ['2xl']: 12, });

  return (
    <React.Fragment>
      <Flex
        w={['100%', '100%', '100px', '100px', '200px']}
        direction="column"
        bgGradient="linear(to-b, green.500, green.400)"
        color="#fff"
        py={4}
        display={['none', 'none', 'block']}
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

      <MobileSidebar />
    </React.Fragment>
  );
}

function MobileSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display={['block', 'block', 'none']}>
      <Flex
        w="100%"
        bgGradient="linear(to-r, green.500, green.400)"
        color="#fff"
        p={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          aria-label="Open Menu"
          variant="ghost"
          icon={<HamburgerIcon h={8} w={8} />}
          onClick={onOpen}
        />
        <Logo />
        <div style={{ width: 40 }} />
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={2} color="white" />
          <DrawerHeader
            bgGradient="linear(to-r, green.500, green.400)"
            color="white"
          >
            Sidebar Menu
          </DrawerHeader>

          <DrawerBody style={{ padding: 0 }}>
            <Flex direction="column" w="100%" bg="white">
              {SIDEBAR_LINKS.map((link, key) => {
                // https://stackoverflow.com/a/64277686
                const Icon = link.icon;

                return (
                  <Link key={key} as={NextLink} href={link.route}>
                    <Box
                      as="button"
                      py={4}
                      pl={6}
                      w="100%"
                      _hover={{ bg: 'green.300' }}
                      display="flex"
                      alignItems="center"
                      borderBottom="1px solid gainsboro"
                      borderTop={!key ? '1px solid gainsboro' : 'none'}
                      onClick={onClose}
                    >
                      <Icon style={{ color: '#000', marginRight: 20 }} />
                      <Text
                        fontSize="xl"
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
