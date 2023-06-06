import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CardBody,
  CardFooter,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import ProfilePicture from './ProfilePicture';
import FramerCarousel from './FramerNFTCarousel';
import { Controller } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { FiChevronLeft } from 'react-icons/fi';
import submitProject from '~/pages/submit-project';

type CreateProfileStepThreeTypes = {
  handleSubmit: any;
  onOpen: any;
  onClose: any;
  isOpen: any;
  setUserNameIsAvailable: any;
  trigger: any;
  loadingUserName: any;
  errors: any;
  userNameIsAvailable: any;
  pfp: any;
  setPFP: any;
  control: any;
  onSubmit: any;
  onNext: () => void;
  onPrevious: () => void;
};

const CreateProfileStepThree = ({
  handleSubmit,
  onOpen,
  onClose,
  isOpen,
  setUserNameIsAvailable,
  trigger,
  loadingUserName,
  errors,
  userNameIsAvailable,
  pfp,
  setPFP,
  control,
  onSubmit,
  onPrevious,
  onNext,
}: CreateProfileStepThreeTypes) => {
  return (
    <>
      {' '}
      <CardBody>
        <form
          style={{
            gap: '32px',
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            w="full"
            variant={'outline'}
            colorScheme={'pink'}
            isRequired
          >
            <FormLabel
              fontSize={{ base: 'xs', md: 'sm' }}
              htmlFor="profilePicture"
            >
              Profile Picture
            </FormLabel>
            <ProfilePicture
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
              pfp={pfp}
            />
          </FormControl>
          <Collapse in={isOpen} animateOpacity>
            <FramerCarousel onClose={onClose} setPFP={setPFP} PFP={pfp} />
          </Collapse>
          <FormControl
            variant={'outline'}
            colorScheme={'pink'}
            isInvalid={!!errors.username}
            isRequired
          >
            <FormLabel fontSize={{ base: 'xs', md: 'sm' }} htmlFor="username">
              Username
            </FormLabel>
            <InputGroup>
              <Controller
                name="username"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, ...field } }: { field: any }) => (
                  <Input
                    {...field}
                    autoComplete="false"
                    placeholder="@username"
                    onChange={({ target: { value } }) => {
                      setUserNameIsAvailable(false);
                      onChange(value);
                      if (value.length > 3)
                        trigger('username')
                          .then((res: boolean) => {
                            if (res) {
                              setUserNameIsAvailable(true);
                            }
                          })
                          .catch(
                            (e: any) =>
                              new Error(e.message || 'there was an error')
                          );
                    }}
                  />
                )}
              />
              {
                <InputRightElement fontSize="18px">
                  {loadingUserName && <Spinner size={'xs'} thickness="1px" />}
                  {!errors.username && userNameIsAvailable && (
                    <HiCheck color={'#A8F0E6'} />
                  )}
                </InputRightElement>
              }
            </InputGroup>
            <FormErrorMessage textAlign={'start'}>
              {errors.username && <>{errors.username.message}</>}
            </FormErrorMessage>
          </FormControl>
          <VStack
            p="0"
            pt={{ base: '24px', md: '56px' }}
            w="full"
            align={'start'}
            justify="start"
            gap={{ base: '8px', md: '18px' }}
          >
            {' '}
            <CardFooter>
              <Button
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant={'cubikText'}
                leftIcon={<Box as={FiChevronLeft} width={5} height={5} />}
                onClick={() => onPrevious()}
              >
                Previous
              </Button>
              <Button
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant="cubikFilled"
                loadingText="Submitting"
                type="submit"
              >
                Submit Profile
              </Button>
            </CardFooter>
            {/* <Alert status="info" variant="cubik">
              <AlertIcon />
              <AlertDescription
                fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
              >
                By clicking submit, you&apos;ll initiate a profile creation
                transaction from connected wallet. Ensure you have enough SOL to
                sign the transaction.
              </AlertDescription>
            </Alert> */}
          </VStack>
        </form>
      </CardBody>
    </>
  );
};

export default CreateProfileStepThree;
