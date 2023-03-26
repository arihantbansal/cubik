import {
  Box,
  Button,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaTwitter } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FormData } from '~/pages/submit-project';

type StepTwoProps = {
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<StepTwoFormValues>;
};

type StepTwoFormValues = {
  github: string;
  twitter: string;
  projectLink: string;
  telegram: string;
  discord: string;
};
const StepTwo: React.FC<StepTwoProps> = ({
  onSubmit,
  register,
  onPrevious,
  errors,
}: StepTwoProps) => {
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);

  const onTwitterConnect = async () => {
    try {
      const response = await fetch('/api/twitter/auth');
      const { url } = await response.json();
      window.location.replace(url);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyTwitterHandle = async () => {
    const twitterHandle = ''; //control.getValues('twitter');
    if (twitterHandle) {
      try {
        const response = await fetch(
          `/api/twitter/verify?handle=${twitterHandle}`
        );
        const { success } = await response.json();
        if (success) {
          setIsTwitterConnected(true);
        } else {
          setIsTwitterConnected(false);
          // setValue('twitter', '');
        }
      } catch (error) {
        console.error(error);
        setIsTwitterConnected(false);
        //setValue('twitter', '');
      }
    }
  };

  return (
    <>
      <CardBody>
        <FormControl isInvalid={Boolean(errors.projectLink)} id="projectLink">
          <FormLabel>Project Link</FormLabel>
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
        <FormControl id="twitter">
          <FormLabel>Twitter</FormLabel>
          <InputGroup>
            {!isTwitterConnected && (
              <Button
                leftIcon={
                  <Icon as={FaTwitter} width={6} height={6} color="#021412" />
                }
                variant={'connect_twitter'}
                onBlur={verifyTwitterHandle}
                onClick={onTwitterConnect}
              >
                Connect Twitter
              </Button>
            )}
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.github)} id="github">
          <FormLabel>Github</FormLabel>
          <Input
            placeholder="https://github.com/example"
            type="url"
            {...register('github')}
          />
        </FormControl>
        {errors.github && (
          <FormErrorMessage>{errors.github.message}</FormErrorMessage>
        )}
        <FormControl isInvalid={Boolean(errors.telegram)} id="telegram">
          <FormLabel>
            Telegram{' '}
            <Box
              pl="0.5rem"
              as="span"
              textStyle={'body4'}
              color="surface.stoke_white"
            >
              (Optional)
            </Box>
          </FormLabel>
          <Input
            placeholder="https://telegram.com"
            type="url"
            {...register('telegram')}
          />
          {errors.telegram ? (
            <FormErrorMessage>{errors.telegram.message}</FormErrorMessage>
          ) : (
            <FormHelperText></FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.discord)} id="discord">
          <FormLabel>
            Discord{' '}
            <Box
              pl="0.5rem"
              as="span"
              textStyle={'body4'}
              color="surface.stoke_white"
            >
              (Optional)
            </Box>
          </FormLabel>
          <Input
            placeholder="https://discord.gg"
            type="url"
            {...register('discord')}
          />
          {errors.discord ? (
            <FormErrorMessage>{errors.discord.message}</FormErrorMessage>
          ) : (
            <FormHelperText></FormHelperText>
          )}
        </FormControl>
      </CardBody>
      <CardFooter>
        <Button
          variant={'outline'}
          onClick={onPrevious}
          leftIcon={<Icon as={FiChevronLeft} width={5} height={5} />}
        >
          Previous
        </Button>
        <Button
          variant={'outline'}
          onClick={onSubmit}
          rightIcon={<Icon as={FiChevronRight} width={5} height={5} />}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export { StepTwo };
