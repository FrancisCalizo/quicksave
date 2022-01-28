import React from 'react';
import Image from 'next/image';

import '@fontsource/roboto';

import { Heading, Flex, useBreakpointValue } from '@chakra-ui/react';

import MoneyBag from 'public/images/money-bag.png';

export default function Logo() {
  const widthHeight = useBreakpointValue({
    base: 40,
    sm: 40,
    md: 40,
    lg: 40,
    xl: 85,
    ['2xl']: 85,
  });

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Image
        alt="Money-Bag"
        src={MoneyBag}
        layout="fixed"
        width={widthHeight}
        height={widthHeight}
        priority
      />
      <Heading
        as="h3"
        fontSize={['xs', 'xs', 'xs', 'xs', '2xl']}
        textAlign="left"
        fontFamily="Roboto"
        mt={-1}
        zIndex={10}
      >
        Quick$ave.
      </Heading>
    </Flex>
  );
}
