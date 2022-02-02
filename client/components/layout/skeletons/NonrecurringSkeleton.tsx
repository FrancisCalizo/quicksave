import React from 'react';

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Flex,
} from '@chakra-ui/react';

export default function NonrecurringSkeleton() {
  return (
    <>
      {/* Middle Section */}
      <Flex
        w={['100%', '100%', '70%']}
        direction="column"
        overflowY="auto"
        overflowX="hidden"
        minHeight="100vh"
        px={4}
        py={6}
      >
        <Flex align="center">
          <Skeleton height={10} width={300} />
        </Flex>

        <Flex
          flexDirection={['column', 'column', 'column', 'row']}
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb={[2, 2, 2, 4]}
        >
          <Skeleton width="100%" height={110} />
        </Flex>

        <Flex justify="flex-end" align="center" mt={2} mb={[2, 6, 6, 2]}>
          <Skeleton width={['100%', '100%', '100%', '200px']} height="50px" />
        </Flex>

        <SkeletonText mt="4" noOfLines={15} spacing="8" height="100%" />
      </Flex>

      {/* Right Section */}
      <Flex
        w={['100%', '100%', '30%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '250px', '300px', '400px']}
      >
        <Box my={4} mx={4}>
          <Skeleton height={10} width="100%" mb={2} />

          <Flex justifyContent="center">
            <Skeleton height={6} width={200} />
          </Flex>

          <Flex px={4} justifyContent="center" my={4}>
            <SkeletonCircle size="250" />
          </Flex>

          <Box px={4}>
            <SkeletonText mt="4" noOfLines={15} spacing="8" height="100%" />
          </Box>
        </Box>
      </Flex>
    </>
  );
}
