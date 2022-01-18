import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

import {
  Center,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const res = await axios.post('/login', {
        username,
        password,
      });

      if (res.status === 200) {
        router.push('/dashboard');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <Center h="100vh">
      <Flex display="flex" flexDirection="column" minWidth={400}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            autoFocus
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            autoFocus
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="green"
          onClick={handleLogin}
          isLoading={isLoading}
          loadingText="Logging In"
        >
          Login
        </Button>
        <Link href={'/dashboard'}>
          <Button colorScheme="blue" my={3} variant="outline">
            Straight To Dashboard
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}
