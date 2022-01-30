import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import {
  Center,
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

export default function Signup() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [password, setPassword] = useState('');

  const handleRegister = async (values: any) => {
    const { email, password } = values;

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
      console.error(err);

      // User email already exists
      if (err.response.data === 'User already exists') {
        alert(err.response.data);
      }
    }
  };

  return (
    <Center h="100vh">
      <Flex display="flex" flexDirection="column" minWidth={400}>
        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isRequired mb={4} isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              autoFocus
              {...register('email', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired mb={4} isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              {...register('password', {
                required: 'This is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="green"
            isLoading={isSubmitting}
            loadingText="Logging In"
            type="submit"
            width="100%"
          >
            Register
          </Button>
        </form>
      </Flex>
    </Center>
  );
}
