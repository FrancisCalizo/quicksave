import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  Center,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      const res = await axios.post('/register', {
        email,
        password,
      });

      // TODO: Just login the user after registration
      // instead of bringing them to login page
      if (res.status === 200) {
        router.push('/login');
      }
    } catch (err: any) {
      console.error(err.response);

      if (err.response.data === 'User already exists') {
        alert(err.response.data);
      }
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
          onClick={handleRegister}
          isLoading={isLoading}
          loadingText="Logging In"
        >
          Register
        </Button>
      </Flex>
    </Center>
  );
}
