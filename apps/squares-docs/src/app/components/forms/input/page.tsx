'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';
import { useForm } from 'react-hook-form';

import {
  Button,
  HelperText,
  InputContainer,
  InputField,
  InputFieldContainer,
  InputLabel,
  InputLeftElement,
  InputRightElement,
} from '@cubik/ui';

interface FormType {
  email: string;
  password: string;
}

const FormSuccess = () => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // console.log(getValues("email"))
  return (
    <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-4">
      <InputContainer>
        <InputLabel
          maxCounterValue={10}
          counterValue={watch('email') ? watch('email').length : 0}
          isRequired
        >
          Email
        </InputLabel>
        <InputFieldContainer isDisabled={false} variant="md">
          <InputField
            maxLength={10}
            id="email"
            placeholder="test@cubik.com"
            type="text"
            onChange={(e) => setValue('email', e.currentTarget.value)}
          />
        </InputFieldContainer>
        <HelperText variant={'error'} fontSize={'md'}>
          {errors.email?.message}
        </HelperText>
      </InputContainer>
      <InputContainer>
        <InputLabel isRequired>Password</InputLabel>
        <InputFieldContainer isDisabled={false} variant="md">
          <InputField
            id="password"
            placeholder="random"
            type="text"
            onChange={(e) => setValue('password', e.currentTarget.value)}
          />
        </InputFieldContainer>
        <HelperText variant={'error'} fontSize={'md'}>
          {errors.password?.message}
        </HelperText>
      </InputContainer>
      <Button variant="success" type="submit">
        Submit
      </Button>
    </form>
  );
};
const FormError = () => {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <>
      <h1>Form with Error</h1>
      <form
        onSubmit={handleSubmit(() => {
          setError('email', {
            message: 'Invalid Email',
          });
          setError('password', {
            message: 'Invalid password',
          });
        })}
        className="flex flex-col gap-4"
      >
        <InputContainer>
          <InputLabel isRequired>Email</InputLabel>
          <InputFieldContainer
            isError={errors.email ? true : false}
            isDisabled={false}
            variant="md"
          >
            <InputField
              id="email"
              placeholder="test@cubik.com"
              type="text"
              onChange={(e) => setValue('email', e.currentTarget.value)}
            />
          </InputFieldContainer>
          <HelperText variant={'error'} fontSize={'md'}>
            {errors.email?.message}
          </HelperText>
        </InputContainer>
        <InputContainer>
          <InputLabel isRequired>Password</InputLabel>
          <InputFieldContainer
            isError={errors.email ? true : false}
            isDisabled={false}
            variant="md"
          >
            <InputField
              id="password"
              placeholder="random"
              type="text"
              onChange={(e) => setValue('password', e.currentTarget.value)}
            />
          </InputFieldContainer>
          <HelperText variant={'error'} fontSize={'md'}>
            {errors.password?.message}
          </HelperText>
        </InputContainer>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
const InputPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        {
          name: 'Input',
          href: '/component/input',
          current: true,
        },
      ]}
      heading={'Input'}
      description=""
    >
      <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
        <CodeComponent
          codeString='import {   HelperText,
  InputContainer,
  InputField,
  InputFieldContainer,
  InputLabel,
  InputLeftElement,
  InputRightElement, } from "@cubik/ui"'
        />
      </div>
      <div className="flex flex-col gap-10">
        <InputContainer>
          <InputLabel maxCounterValue={100} counterValue={10} isRequired>
            Hello world
          </InputLabel>
          <InputFieldContainer isDisabled={false} variant="md">
            <InputLeftElement withBorder={true}>https</InputLeftElement>
            <InputField
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <InputRightElement>https</InputRightElement>
          </InputFieldContainer>
          <HelperText variant={'success'} fontSize={'md'}>
            hello
          </HelperText>
        </InputContainer>
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent
            codeString={` <InputContainer>
          <InputLabel maxCounterValue={100} counterValue={10} isRequired>
            Hello world
          </InputLabel>
          <InputFieldContainer isDisabled={false} variant="md">
            <InputLeftElement withBorder={true}>https</InputLeftElement>
            <InputField
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <InputRightElement>https</InputRightElement>
          </InputFieldContainer>
          <HelperText variant={'success'} fontSize={'md'}>
            hello
          </HelperText>
        </InputContainer>`}
          />
        </div>
        <div className="flex flex-col gap-10">
          <FormSuccess />
          <FormError />
        </div>
      </div>
    </PageHOC>
  );
};

export default InputPage;
