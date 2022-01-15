import React from 'react';
import Image from 'next/image';

import '@fontsource/roboto';

import { Heading, Flex } from '@chakra-ui/react';

import MoneyBag from 'public/images/money-bag.png';

export default function Logo() {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Image
        alt="Money-Bag"
        src={MoneyBag}
        layout="fixed"
        width={85}
        height={85}
        priority
      />
      <Heading
        as="h3"
        fontSize="2xl"
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
