import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import {
  Center,
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

type FormValues = {
  email: string;
  password: string;
  apiError: string;
};

export default function Signup() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormValues>();

  const [_isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (values: FormValues) => {
    setIsSubmitting(true);

    const { email, password } = values;

    try {
      const res = await axios.post('/register', {
        email,
        password,
      });

      if (res.status === 200) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error(err);

      // User email already exists
      if (err.response.data === 'User email already exists') {
        setError('apiError', { message: err.response.data });
      }

      setIsSubmitting(false);
    }
  };

  return (
    <Center h="100vh">
      <Flex display="flex" flexDirection="column" minWidth={400}>
        {errors.apiError && (
          <Box mb={4}>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription> {errors.apiError.message}</AlertDescription>
            </Alert>
          </Box>
        )}

        <form
          onSubmit={(e) => {
            /* https://github.com/react-hook-form/react-hook-form/issues/70#issuecomment-939947190 */
            clearErrors();
            handleSubmit(handleRegister)(e);
          }}
        >
          <FormControl isRequired mb={4} isInvalid={errors.email as any}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              autoFocus
              {...register('email', {
                required: 'Email is required',
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
            isLoading={isSubmitting || _isSubmitting}
            loadingText={isSubmitting ? 'Registering' : 'Logging In'}
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
