import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

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
    }
  };

  return (
    <Center h="100vh">
      <Flex display="flex" flexDirection="column" minWidth={400}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isRequired mb={4} isInvalid={errors.email as any}>
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

          <FormControl isRequired mb={4} isInvalid={errors.password as any}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              autoFocus
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
            Login
          </Button>
        </form>
      </Flex>
    </Center>
  );
}
