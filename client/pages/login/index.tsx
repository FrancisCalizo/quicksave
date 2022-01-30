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

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const res = await axios.post('/loginUser', {
        email,
        password,
      });

      if (res.status === 200) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error(err);

      // Login Credentials are invalid
      if (err.response.data === 'Invalid Credentials') {
        alert(err.response.data);
      }
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <Center h="100vh">
      <Flex display="flex" flexDirection="column" minWidth={400}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            autoFocus
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </Flex>
    </Center>
  );
}
