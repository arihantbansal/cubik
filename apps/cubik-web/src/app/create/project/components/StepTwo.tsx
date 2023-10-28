'use client';

import ChainLink from '@/theme/icons/chain_link.svg';
import ChevronLeft from '@/theme/icons/chevron_left.svg';
import ChevronRight from '@/theme/icons/chevron_right.svg';
import Discord from '@/theme/icons/socials/discord.svg';
import Github from '@/theme/icons/socials/github.svg';
import Telegram from '@/theme/icons/socials/telegram.svg';
import Twitter from '@/theme/icons/socials/twitter.svg';
import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';

import type { FormData } from './Form';

type StepTwoProps = {
  trigger: UseFormTrigger<FormData>;
  onSubmit: () => void;
  onPrevious: () => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<StepTwoFormValues>;
  setError: UseFormSetError<FormData>;
};

type StepTwoFormValues = {
  github: string;
  twitter: string;
  projectLink: string;
  telegram: string;
  discord: string;
};
const StepTwo: React.FC<StepTwoProps> = ({
  trigger,
  onSubmit,
  register,
  onPrevious,
  errors,
}: StepTwoProps) => {
  return (
    <>
      <CardBody>
        <FormControl
          isRequired
          isInvalid={Boolean(errors.projectLink)}
          id="projectLink"
        >
          <FormLabel pb="0.5rem">
            <Box as="span" textStyle="title5" color="neutral.11">
              Project Link
            </Box>
          </FormLabel>
          <Input
            placeholder="https://example.com"
            type="url"
            {...register('projectLink', {
              required: true,
            })}
          />
          {errors.projectLink ? (
            <FormErrorMessage>{errors.projectLink.message}</FormErrorMessage>
          ) : (
            <FormHelperText></FormHelperText>
          )}
        </FormControl>
        <VStack align={'start'} gap="16px">
          <Box as="p" textStyle="title5" color="neutral.11">
            Socials
          </Box>
          <FormControl
            isRequired
            id="twitter"
            isInvalid={Boolean(errors.twitter)}
          >
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <Center width="18px" height="18px">
                  <Twitter color="#ADB8B6" />
                </Center>
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="500">
                  Twitter
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://twitter.com.com/twitter"
                type="twitter"
                {...register('twitter', {
                  required: true,
                })}
              />
            </InputGroup>
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              {errors.twitter && errors.twitter.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="github">
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <Center width="18px" height="18px">
                  <Github color="#ADB8B6" />
                </Center>
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="500">
                  Github
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://github.com/example"
                type="url"
                {...register('github')}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.telegram)} id="telegram">
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <Center width="18px" height="18px">
                  <Telegram color="#ADB8B6" />
                </Center>
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="500">
                  Telegram
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://telegram.com"
                type="url"
                {...register('telegram')}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.discord)} id="discord">
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <Center width="18px" height="18px">
                  <Discord color="#ADB8B6" />
                </Center>
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="500">
                  Discord
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://discord.gg"
                type="url"
                {...register('discord')}
              />
            </InputGroup>
          </FormControl>
          <FormControl
            variant="withAddOn"
            isInvalid={Boolean(errors.discord)}
            id="discord"
          >
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <Center width="18px" height="18px">
                  <ChainLink color="#ADB8B6" />
                </Center>
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="500">
                  Custom
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://example.com"
                type="url"
                {...register('discord')}
              />
            </InputGroup>
          </FormControl>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          variant={'cubikText'}
          size={{ base: 'cubikSmall', md: 'cubikMedium' }}
          leftIcon={
            <Center width="20px" height="20px">
              <ChevronLeft width="14" height="14" />{' '}
            </Center>
          }
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          variant={'cubikText'}
          size={{ base: 'cubikSmall', md: 'cubikMedium' }}
          rightIcon={
            <Center width="20px" height="20px">
              <ChevronRight width="14" height="14" />{' '}
            </Center>
          }
          onClick={async () => {
            const isValid = await trigger(['projectLink', 'twitter']);
            if (isValid) {
              //@ts-ignore
              onSubmit();
            }
          }}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export { StepTwo };
