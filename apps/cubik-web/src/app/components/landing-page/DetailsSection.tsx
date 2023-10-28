import Image from 'next/image';
import { Box, Button, Center, Stack, VStack } from '@/utils/chakra';

const DetailsSection = () => {
  return (
    <VStack
      backgroundColor="transparent"
      overflow="hidden"
      spacing="0"
      w="100%"
    >
      <Center
        zIndex={'1'}
        w="100%"
        rounded="50px 50px 0px 0px"
        height={{ base: '24rem', md: '18rem' }}
        bgGradient="linear-gradient(180deg, #021412 0%, #000000 100%)"
        backgroundColor="#000000"
        position="relative"
        overflow={'hidden'}
        borderTop="2px solid #162624"
        _before={{
          content: '""',
          zIndex: '-2',
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'full',
          height: 'full',
          backgroundColor: '#000000',
          filter: 'blur(240px)',
          borderRadius: 'full',
        }}
      >
        <VStack
          zIndex="1"
          textAlign={'center'}
          maxW="3xl"
          px={{ base: '1rem', md: '2rem' }}
          gap="0.6rem"
        >
          <Box
            as="p"
            textStyle={{ base: 'headline3', sm: 'headline2', lg: 'display3' }}
          >
            Built on transparency, accountability, & community driven support
          </Box>
          <Box
            as="p"
            px={{ base: '2.5rem', md: '0' }}
            textStyle={{ base: 'title5', sm: 'title4', md: 'title3' }}
            color="neutral.8"
          >
            With Cubik, you can create a project and start receiving funding in
            minutes.
          </Box>
        </VStack>
      </Center>
      <Box
        height={{ base: '40rem', md: '55rem' }}
        width="100%"
        position="relative"
        backgroundColor="#000000"
      >
        <Center
          backgroundColor="#000000"
          position={'absolute'}
          top={'0'}
          left="50%"
          objectPosition={'center'}
          objectFit={'cover'}
          transform={'translate(-50%, -00%)'}
          width="200%"
          height="full"
          _before={{
            content: '""',
            zIndex: '1',
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            width: 'full',
            height: '8rem',
            backgroundImage:
              'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
            borderRadius: 'full',
          }}
        >
          <Image
            src="/images/grid.png"
            alt="cubik grid"
            fill={false}
            width={1300}
            height={1200}
          />
        </Center>
      </Box>
      <Center w="full" backgroundColor="#000000" zIndex="1">
        <Center
          maxW="7xl"
          transform={{ base: 'translateY(-14rem)', lg: 'translateY(-20rem)' }}
          px={{ base: '1rem', md: '4rem', lg: '5rem' }}
          position={'relative'}
        >
          <Stack
            p="3rem"
            pb={{ base: '15rem', lg: '3rem' }}
            backdropFilter={'blur(100px)'}
            position={'relative'}
            backgroundColor="#00000020"
            border="1px solid #1C2726"
            rounded="16px"
            textAlign={'start'}
            overflow="hidden"
            alignItems="start"
            direction={{ base: 'column', lg: 'row' }}
            gap="4rem"
          >
            <VStack
              gap="1rem"
              zIndex={'1'}
              alignItems="start"
              position="relative"
              flex={'50%'}
            >
              <Box as="p" textStyle={{ base: 'headline3', md: 'display3' }}>
                How does the magic happen?
              </Box>
              <Box
                opacity="0.8"
                as="p"
                textStyle={{ base: 'body4', md: 'body3' }}
                color="neutral.9"
              >
                Quadratic funding is a method of funding public goods that
                involves matching small individual contributions with larger
                matching funds.
              </Box>
              <Center position={'absolute'} right="1rem" top="0.5rem">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4999 5.25C10.69 5.25004 10.8749 5.312 11.0267 5.42651C11.1785 5.54103 11.2888 5.70186 11.341 5.88467L12.2895 9.205C12.4937 9.92007 12.8769 10.5713 13.4027 11.0971C13.9286 11.623 14.5798 12.0061 15.2949 12.2103L18.6152 13.1588C18.7979 13.2112 18.9586 13.3216 19.073 13.4733C19.1874 13.6251 19.2492 13.81 19.2492 14C19.2492 14.19 19.1874 14.3749 19.073 14.5267C18.9586 14.6784 18.7979 14.7888 18.6152 14.8412L15.2949 15.7897C14.5798 15.9939 13.9286 16.377 13.4027 16.9029C12.8769 17.4287 12.4937 18.0799 12.2895 18.795L11.341 22.1153C11.2887 22.298 11.1783 22.4587 11.0265 22.5731C10.8748 22.6875 10.6899 22.7494 10.4999 22.7494C10.3098 22.7494 10.1249 22.6875 9.97318 22.5731C9.82142 22.4587 9.71103 22.298 9.65869 22.1153L8.71019 18.795C8.50597 18.0799 8.12284 17.4287 7.59699 16.9029C7.07114 16.377 6.41993 15.9939 5.70486 15.7897L2.38452 14.8412C2.20183 14.7888 2.04114 14.6784 1.92675 14.5267C1.81236 14.3749 1.75049 14.19 1.75049 14C1.75049 13.81 1.81236 13.6251 1.92675 13.4733C2.04114 13.3216 2.20183 13.2112 2.38452 13.1588L5.70486 12.2103C6.41993 12.0061 7.07114 11.623 7.59699 11.0971C8.12284 10.5713 8.50597 9.92007 8.71019 9.205L9.65869 5.88467C9.71091 5.70186 9.82126 5.54103 9.97303 5.42651C10.1248 5.312 10.3097 5.25004 10.4999 5.25ZM20.9999 1.75C21.1951 1.74989 21.3847 1.81506 21.5386 1.93513C21.6925 2.05521 21.8018 2.2233 21.8492 2.41267L22.1502 3.62133C22.2854 4.15955 22.564 4.65103 22.9564 5.04343C23.3488 5.43583 23.8403 5.71447 24.3785 5.84967L25.5872 6.15067C25.7769 6.19766 25.9455 6.30683 26.0659 6.46077C26.1864 6.6147 26.2518 6.80454 26.2518 7C26.2518 7.19546 26.1864 7.3853 26.0659 7.53923C25.9455 7.69317 25.7769 7.80234 25.5872 7.84933L24.3785 8.15033C23.8403 8.28553 23.3488 8.56417 22.9564 8.95657C22.564 9.34897 22.2854 9.84045 22.1502 10.3787L21.8492 11.5873C21.8022 11.7771 21.693 11.9456 21.5391 12.0661C21.3852 12.1865 21.1953 12.252 20.9999 12.252C20.8044 12.252 20.6146 12.1865 20.4606 12.0661C20.3067 11.9456 20.1975 11.7771 20.1505 11.5873L19.8495 10.3787C19.7149 9.84017 19.4365 9.34838 19.044 8.95589C18.6515 8.56339 18.1597 8.28495 17.6212 8.15033L16.4125 7.84933C16.2228 7.80234 16.0543 7.69317 15.9338 7.53923C15.8133 7.3853 15.7479 7.19546 15.7479 7C15.7479 6.80454 15.8133 6.6147 15.9338 6.46077C16.0543 6.30683 16.2228 6.19766 16.4125 6.15067L17.6212 5.84967C18.1597 5.71505 18.6515 5.43661 19.044 5.04411C19.4365 4.65162 19.7149 4.15983 19.8495 3.62133L20.1505 2.41267C20.1979 2.2233 20.3072 2.05521 20.4611 1.93513C20.615 1.81506 20.8047 1.74989 20.9999 1.75ZM19.2499 17.5C19.4336 17.4999 19.6128 17.5577 19.7619 17.6651C19.911 17.7725 20.0225 17.9241 20.0805 18.0985L20.5402 19.4787C20.7152 20.0002 21.1235 20.4108 21.6462 20.5847L23.0264 21.0455C23.2002 21.1038 23.3512 21.2153 23.4583 21.3641C23.5653 21.513 23.6229 21.6917 23.6229 21.875C23.6229 22.0583 23.5653 22.237 23.4583 22.3859C23.3512 22.5347 23.2002 22.6462 23.0264 22.7045L21.6462 23.1653C21.3887 23.2513 21.1547 23.3959 20.9628 23.5879C20.7708 23.7798 20.6261 24.0138 20.5402 24.2713L20.0794 25.6515C20.021 25.8253 19.9096 25.9764 19.7607 26.0834C19.6119 26.1904 19.4332 26.248 19.2499 26.248C19.0665 26.248 18.8878 26.1904 18.739 26.0834C18.5902 25.9764 18.4787 25.8253 18.4204 25.6515L17.9595 24.2713C17.8736 24.0138 17.7289 23.7798 17.537 23.5879C17.345 23.3959 17.111 23.2513 16.8535 23.1653L15.4734 22.7045C15.2996 22.6462 15.1485 22.5347 15.0415 22.3859C14.9344 22.237 14.8768 22.0583 14.8768 21.875C14.8768 21.6917 14.9344 21.513 15.0415 21.3641C15.1485 21.2153 15.2996 21.1038 15.4734 21.0455L16.8535 20.5847C17.111 20.4987 17.345 20.3541 17.537 20.1621C17.7289 19.9702 17.8736 19.7362 17.9595 19.4787L18.4204 18.0985C18.4784 17.9243 18.5897 17.7728 18.7385 17.6654C18.8874 17.558 19.0663 17.5001 19.2499 17.5Z"
                    fill="#D645A6"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4999 5.25C10.69 5.25004 10.8749 5.312 11.0267 5.42651C11.1785 5.54103 11.2888 5.70186 11.341 5.88467L12.2895 9.205C12.4937 9.92007 12.8769 10.5713 13.4027 11.0971C13.9286 11.623 14.5798 12.0061 15.2949 12.2103L18.6152 13.1588C18.7979 13.2112 18.9586 13.3216 19.073 13.4733C19.1874 13.6251 19.2492 13.81 19.2492 14C19.2492 14.19 19.1874 14.3749 19.073 14.5267C18.9586 14.6784 18.7979 14.7888 18.6152 14.8412L15.2949 15.7897C14.5798 15.9939 13.9286 16.377 13.4027 16.9029C12.8769 17.4287 12.4937 18.0799 12.2895 18.795L11.341 22.1153C11.2887 22.298 11.1783 22.4587 11.0265 22.5731C10.8748 22.6875 10.6899 22.7494 10.4999 22.7494C10.3098 22.7494 10.1249 22.6875 9.97318 22.5731C9.82142 22.4587 9.71103 22.298 9.65869 22.1153L8.71019 18.795C8.50597 18.0799 8.12284 17.4287 7.59699 16.9029C7.07114 16.377 6.41993 15.9939 5.70486 15.7897L2.38452 14.8412C2.20183 14.7888 2.04114 14.6784 1.92675 14.5267C1.81236 14.3749 1.75049 14.19 1.75049 14C1.75049 13.81 1.81236 13.6251 1.92675 13.4733C2.04114 13.3216 2.20183 13.2112 2.38452 13.1588L5.70486 12.2103C6.41993 12.0061 7.07114 11.623 7.59699 11.0971C8.12284 10.5713 8.50597 9.92007 8.71019 9.205L9.65869 5.88467C9.71091 5.70186 9.82126 5.54103 9.97303 5.42651C10.1248 5.312 10.3097 5.25004 10.4999 5.25ZM20.9999 1.75C21.1951 1.74989 21.3847 1.81506 21.5386 1.93513C21.6925 2.05521 21.8018 2.2233 21.8492 2.41267L22.1502 3.62133C22.2854 4.15955 22.564 4.65103 22.9564 5.04343C23.3488 5.43583 23.8403 5.71447 24.3785 5.84967L25.5872 6.15067C25.7769 6.19766 25.9455 6.30683 26.0659 6.46077C26.1864 6.6147 26.2518 6.80454 26.2518 7C26.2518 7.19546 26.1864 7.3853 26.0659 7.53923C25.9455 7.69317 25.7769 7.80234 25.5872 7.84933L24.3785 8.15033C23.8403 8.28553 23.3488 8.56417 22.9564 8.95657C22.564 9.34897 22.2854 9.84045 22.1502 10.3787L21.8492 11.5873C21.8022 11.7771 21.693 11.9456 21.5391 12.0661C21.3852 12.1865 21.1953 12.252 20.9999 12.252C20.8044 12.252 20.6146 12.1865 20.4606 12.0661C20.3067 11.9456 20.1975 11.7771 20.1505 11.5873L19.8495 10.3787C19.7149 9.84017 19.4365 9.34838 19.044 8.95589C18.6515 8.56339 18.1597 8.28495 17.6212 8.15033L16.4125 7.84933C16.2228 7.80234 16.0543 7.69317 15.9338 7.53923C15.8133 7.3853 15.7479 7.19546 15.7479 7C15.7479 6.80454 15.8133 6.6147 15.9338 6.46077C16.0543 6.30683 16.2228 6.19766 16.4125 6.15067L17.6212 5.84967C18.1597 5.71505 18.6515 5.43661 19.044 5.04411C19.4365 4.65162 19.7149 4.15983 19.8495 3.62133L20.1505 2.41267C20.1979 2.2233 20.3072 2.05521 20.4611 1.93513C20.615 1.81506 20.8047 1.74989 20.9999 1.75ZM19.2499 17.5C19.4336 17.4999 19.6128 17.5577 19.7619 17.6651C19.911 17.7725 20.0225 17.9241 20.0805 18.0985L20.5402 19.4787C20.7152 20.0002 21.1235 20.4108 21.6462 20.5847L23.0264 21.0455C23.2002 21.1038 23.3512 21.2153 23.4583 21.3641C23.5653 21.513 23.6229 21.6917 23.6229 21.875C23.6229 22.0583 23.5653 22.237 23.4583 22.3859C23.3512 22.5347 23.2002 22.6462 23.0264 22.7045L21.6462 23.1653C21.3887 23.2513 21.1547 23.3959 20.9628 23.5879C20.7708 23.7798 20.6261 24.0138 20.5402 24.2713L20.0794 25.6515C20.021 25.8253 19.9096 25.9764 19.7607 26.0834C19.6119 26.1904 19.4332 26.248 19.2499 26.248C19.0665 26.248 18.8878 26.1904 18.739 26.0834C18.5902 25.9764 18.4787 25.8253 18.4204 25.6515L17.9595 24.2713C17.8736 24.0138 17.7289 23.7798 17.537 23.5879C17.345 23.3959 17.111 23.2513 16.8535 23.1653L15.4734 22.7045C15.2996 22.6462 15.1485 22.5347 15.0415 22.3859C14.9344 22.237 14.8768 22.0583 14.8768 21.875C14.8768 21.6917 14.9344 21.513 15.0415 21.3641C15.1485 21.2153 15.2996 21.1038 15.4734 21.0455L16.8535 20.5847C17.111 20.4987 17.345 20.3541 17.537 20.1621C17.7289 19.9702 17.8736 19.7362 17.9595 19.4787L18.4204 18.0985C18.4784 17.9243 18.5897 17.7728 18.7385 17.6654C18.8874 17.558 19.0663 17.5001 19.2499 17.5Z"
                    fill="url(#paint0_linear_49_158)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_49_158"
                      x1="25.9998"
                      y1="26"
                      x2="1.99976"
                      y2="2"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset="1" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </Center>
            </VStack>
            <VStack flex="50%" zIndex={'1'} gap="3rem" alignItems="start">
              <VStack alignItems="start">
                <Box color="brand.teal5" as="p" textStyle="title6">
                  01
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title4', md: 'title3' }}
                  color="neutral.11"
                >
                  Quadratic funding matches small individual contributions with
                  larger funds from donors.
                </Box>
              </VStack>
              <VStack alignItems="start">
                <Box color="brand.teal5" as="p" textStyle={'title6'}>
                  02
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title4', md: 'title3' }}
                  color="neutral.11"
                >
                  Matching funds are allocated fairly, giving more weight to
                  small donations through a mathematical formula for greater
                  impact from smaller donors.
                </Box>
              </VStack>
              <VStack alignItems="start">
                <Box color="brand.teal5" as="p" textStyle={'title6'}>
                  03
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'title4', md: 'title3' }}
                  color="neutral.11"
                >
                  Quadratic funding encourages broad support from many small
                  donors for public goods and projects.
                </Box>
              </VStack>
            </VStack>
            <Center
              position={'absolute'}
              bottom="0"
              left={{ base: '0%', md: '0%' }}
              zIndex={'0'}
              transform={'translate(0%, 50%)'}
              width={{ base: '100%', lg: '50%' }}
              height="100%"
            >
              <Image
                src="/images/cube.png"
                alt="glass cube"
                layout="fill"
                objectFit="contain"
              />
            </Center>
          </Stack>
        </Center>
      </Center>
      <Center
        transform={'translateY(-8rem)'}
        zIndex={'1'}
        w="100%"
        rounded="0px 0px 50px 50px"
        height="full"
        pb={'3rem'}
        bgGradient="linear-gradient(0deg, #021412 0%, #000000 100%)"
        borderBottom="2px solid #162624"
        position="relative"
        overflow={'hidden'}
        flexDir="column"
        gap="4rem"
        _before={{
          content: '""',
          zIndex: '0',
          position: 'absolute',
          top: '0%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'full',
          height: 'full',
          backgroundColor: '#000000',
          filter: 'blur(240px)',
          rounded: 'full',
        }}
      >
        <Center w="full" p="0">
          <Center
            maxW="7xl"
            w="full"
            px={{ base: '1rem', md: '4rem', lg: '5rem' }}
          >
            <Center
              maxW="7xl"
              zIndex={'1'}
              w={'100%'}
              rounded="xl"
              bg="#000"
              border="1px solid #1C2726"
              overflow={'hidden'}
              h="19rem"
              position={'relative'}
              justifyContent="flex-start"
              p={{ base: '2rem', md: '2rem 3rem' }}
            >
              <VStack alignItems={'start'} zIndex="1">
                <Box
                  textStyle={'overline3'}
                  textTransform="capitalize"
                  color="brand.teal5"
                >
                  JOIN OUR NEWSLETTER
                </Box>
                <Box textStyle={{ base: 'headline3', md: 'headline1' }}>
                  Stay in loop with all things Cubik
                </Box>
                <Box textStyle={{ base: 'body3', md: 'body2' }} color="#566664">
                  We promise we won’t spam you
                </Box>{' '}
                <Center w="full" py="1rem">
                  {/* <HStack
                    zIndex={'1'}
                    border="1px solid #E0FFFD10"
                    w="full"
                    p="0.3rem"
                    bg="neutral.3"
                    rounded={'16px'}
                  >
                    <FormControl bg="neutral.3" rounded="full">
                      <Input
                        bg="neutral.3"
                        variant={'solid'}
                        borderWidth={0}
                        borderLeftRadius="100px"
                        color="white"
                        id={'email'}
                        type={'email'}
                        required
                        placeholder={'Your Email Address'}
                        aria-label={'Your Email'}
                        value={''}
                        disabled={state !== 'initial'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                        _placeholder={{
                          color: 'neutral.7',
                          fontSize: 'sm',
                        }}
                        _active={{
                          borderColor: 'gray.400',
                          shadow: 'none',
                        }}
                        _hover={{
                          borderColor: 'gray.400',
                          shadow: 'none',
                        }}
                        _focus={{
                          borderColor: 'gray.400',
                          shadow: 'none',
                        }}
                      />
                    </FormControl>
                    <FormControl w={{ base: '100%', md: '36%' }}>
                      <Button
                        variant={'primary'}
                        isLoading={state === 'submitting'}
                        w="100%"
                        type={state === 'success' ? 'button' : 'submit'}
                      >
                        {state === 'success' ? 'check icon' : 'Signup'}
                      </Button>
                    </FormControl>
                  </HStack> */}
                </Center>
              </VStack>
              <Center
                zIndex={'0'}
                position={'absolute'}
                right={'0%'}
                top={'0%'}
                width="70rem"
                height="70rem"
                transform={'translate(50%, -10%)'}
                overflow="hidden"
                _before={{
                  content: '""',
                  zIndex: '2',
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'full',
                  height: 'full',
                  backgroundColor: '#000',
                  filter: 'blur(240px)',
                  borderRadius: 'full',
                }}
              >
                <Image
                  src="/images/newsletter.png"
                  alt="email cubik"
                  fill={true}
                />
              </Center>
            </Center>
          </Center>
        </Center>
        <VStack zIndex="1" textAlign={'center'} maxW="3xl" px="2rem" gap="2rem">
          <Box
            w="100%"
            zIndex={'1'}
            sx={{
              bgGradient:
                'linear-gradient(to-r, #ffffff00, #ffffff24, #ffffff00)',
            }}
            height="1px"
          />
          <Box
            as="p"
            textStyle={{ base: 'headline3', sm: 'headline2', lg: 'display3' }}
          >
            Join us in revolutionizing the grants landscape today!
          </Box>
          <Button variant="primary_white">Get Started</Button>
        </VStack>
      </Center>
    </VStack>
  );
};

export default DetailsSection;
