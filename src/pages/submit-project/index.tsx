import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  HStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ProjectsModel } from '@prisma/client';
import { log } from 'console';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid';
import { array, object, string } from 'yup';
import withAuth from '~/components/HOC/WithAuth';
import { StepOne, StepThree, StepTwo } from '~/components/pages/create-project';
import { trpc } from '~/utils/trpc';
import { uploadToCloudinary } from '~/utils/upload';

type SubmitProjectProps = {
  onSubmit: (project: Project) => void;
};
type Project = ProjectsModel;

export type FormData = {
  projectName: string;
  tagline: string;
  category: { label: string; value: string; colorScheme: string }[];
  logo: FileList;
  twitter: string;
  github: string;
  projectLink: string;
  telegram: string;
  discord: string;
  description: string;
};

const SubmitProject: React.FC<SubmitProjectProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<number>(1);
  const [projectid, setProjectid] = useState<string | undefined>();
  const router = useRouter();
  const [LoadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { data: session } = useSession();
  const createProjectMutation = trpc.project.create.useMutation();
  // const userProjects = trpc.project.findPubkey.useQuery({
  //   publickey: session?.user.mainWallet,
  // });
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(
      object().shape({
        projectName: string()
          .required("Project name can't be empty")
          .max(36, 'Must be at most 36 characters'),
        tagline: string()
          .required("Tagline can't be empty")
          .max(240, 'Must be at most 240 characters'),
        logo: string().required("Logo can't be empty"),
        category: array()
          .of(
            object({
              label: string().required(),
              value: string().required(),
              colorScheme: string().required(),
            })
          )
          .max(3, 'Must be at most 3 categories')
          .required('Must select at least one category'),
        twitter: string().required("Twitter handle can't be empty"),
        projectLink: string().required("Project Link can't be empty"),
        github: string(),
        telegram: string(),
        discord: string(),
        description: string().required(),
      })
    ),
    mode: 'onChange',
  });

  const goToNextStep = () => setStep(step + 1);

  const handleStepOneSubmit = async (event: any) => {
    // check if there was an error in submitting the form
    goToNextStep();
  };

  const goToPreviousStep = () => setStep(step - 1);

  const handleStepTwoSubmit = async () => {
    console.log('step two submit');
    goToNextStep();
  };

  const handleStepThreeSubmit = async (editorData: string) => {
    if (!session?.user) return;

    // go to the loading page
    setLoadingSubmit(true);

    try {
      // sign transaction then upload to the db
      const imageUrl = await uploadToCloudinary(getValues('logo')).catch(
        (error) => {
          throw new Error(
            `Error uploading image to Cloudinary: ${error.message}`
          );
        }
      );
      const id = uuidV4();
      try {
        createProjectMutation.mutate({
          id: id,
          name: getValues().projectName,
          short_description: getValues().tagline,
          logo: imageUrl,
          long_description: editorData,
          industry: JSON.stringify(getValues().category),
          github_link: getValues().github,
          twitter_handle: getValues().twitter,
          project_link: getValues().projectLink,
          discord_link: getValues().projectLink,
          telegram_link: getValues().telegram,
          projectUserCount: 0, /// change the length by fetching the user projects and add one more
        });
      } catch (error) {
        console.log(error, '--error');
      }

      console.log('projectSubmissionResponse');
      setProjectid(id);
      console.log('project submission data - ');
      goToNextStep();
    } catch (e) {
      console.error('There was an error submitting the project:', e);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const MotionHStack = motion(HStack);

  const ProjectTimeline = ({
    index,
    name,
  }: {
    index: number;
    name: string;
  }) => {
    const status =
      index < step ? 'complete' : step === index ? 'active' : 'inactive';

    return (
      <MotionHStack
        initial={false}
        animate={status}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
        variants={{
          inactive: { backgroundColor: 'transparent' },
          active: { backgroundColor: '#010F0D' },
          complete: { backgroundColor: '#14665B' },
        }}
        w="full"
        rounded="full"
        border="1px solid #FFFFFF10"
        py="0.5rem"
        px="0.8rem"
        align={'center'}
        justify="start"
      >
        <Box as={motion.div}>
          <Center
            w="1.1rem"
            height="1.1rem"
            rounded="full"
            as="p"
            bg="white"
            color={'black'}
            textStyle={'body5'}
          >
            {index}
          </Center>
        </Box>
        <Box
          as="p"
          textStyle={'body5'}
          color={status === 'inactive' ? 'neutral.7' : 'brand.teal6'}
        >
          {name}
        </Box>
      </MotionHStack>
    );
  };

  return (
    <Container
      transition="all .25s ease"
      maxW="full"
      p={{ base: '1rem', md: '0' }}
      my="10rem"
    >
      <Card maxW="36rem" mx="auto">
        {!(step === 4) && (
          <>
            <CardHeader>
              <Box as="h1" textStyle={'title1'}>
                Create New Project
              </Box>
              <Box as="p" textStyle={'body4'} color="neutral.9">
                Bring your vision to life! Create a project, receive grants
                through public donations, and make an impact.
              </Box>
            </CardHeader>
            <HStack w="full" justify="space-between">
              <ProjectTimeline index={1} name={'Basic Information'} />
              <ProjectTimeline index={2} name={'Project Links'} />
              <ProjectTimeline index={3} name={'Detailed Info'} />
            </HStack>
          </>
        )}
        <form
          // @ts-ignore
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '2rem',
          }}
        >
          {step === 1 && (
            <StepOne
              trigger={trigger}
              onSubmit={handleStepOneSubmit}
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
              control={control}
            />
          )}
          {step === 2 && (
            <StepTwo
              trigger={trigger}
              onSubmit={handleStepTwoSubmit}
              register={register}
              onPrevious={goToPreviousStep}
              errors={errors}
            />
          )}
          {step === 3 && (
            <StepThree
              onPrevious={goToPreviousStep}
              onSubmit={handleStepThreeSubmit}
              setLoadingSubmit={setLoadingSubmit}
              LoadingSubmit={LoadingSubmit}
            />
          )}
          {step === 4 && (
            <>
              {' '}
              <CardHeader w="full">
                <Center>
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.24">
                      <path
                        d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                        fill="#007A6A"
                      />
                      <path
                        d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                        fill="url(#paint0_linear_849_10088)"
                      />
                      <path
                        d="M95.8925 48.836C95.4309 75.2863 73.6144 96.3542 47.164 95.8925C20.7137 95.4309 -0.354246 73.6144 0.107446 47.164C0.569138 20.7137 22.3856 -0.354246 48.836 0.107446C75.2863 0.569138 96.3542 22.3856 95.8925 48.836Z"
                        stroke="white"
                        strokeOpacity="0.18"
                        strokeWidth="0.2"
                      />
                    </g>
                    <g opacity="0.24">
                      <path
                        d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                        fill="#007A6A"
                      />
                      <path
                        d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                        fill="url(#paint1_linear_849_10088)"
                      />
                      <path
                        d="M83.8942 48.6265C83.5482 68.4505 67.1972 84.2404 47.3733 83.8944C27.5493 83.5484 11.7594 67.1974 12.1054 47.3735C12.4514 27.5495 28.8024 11.7596 48.6264 12.1056C68.4503 12.4516 84.2403 28.8026 83.8942 48.6265Z"
                        stroke="white"
                        strokeOpacity="0.18"
                        strokeWidth="0.2"
                      />
                    </g>
                    <rect
                      x="25.0001"
                      y="25"
                      width="46"
                      height="46"
                      rx="23"
                      fill="url(#paint2_linear_849_10088)"
                    />
                    <g clipPath="url(#clip0_849_10088)">
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        fill="#14665B"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        fill="url(#paint3_linear_849_10088)"
                        fill-opacity="0.48"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        stroke="#14665B"
                        strokeWidth="0.710526"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        stroke="url(#paint4_linear_849_10088)"
                        strokeOpacity="0.48"
                        strokeWidth="0.710526"
                      />
                    </g>
                    <rect
                      x="25.0001"
                      y="25"
                      width="46"
                      height="46"
                      rx="23"
                      stroke="#001F1B"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_849_10088"
                        x1="48"
                        y1="0"
                        x2="48"
                        y2="96"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_849_10088"
                        x1="47.9998"
                        y1="12"
                        x2="47.9998"
                        y2="84"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_849_10088"
                        x1="25.0001"
                        y1="25"
                        x2="71.0001"
                        y2="71"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#B3FFF5" />
                        <stop offset="1" stopColor="#5ACCBD" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_849_10088"
                        x1="48.1832"
                        y1="42.5063"
                        x2="48.1832"
                        y2="54.0334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_849_10088"
                        x1="48.1832"
                        y1="42.5063"
                        x2="48.1832"
                        y2="54.0334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <clipPath id="clip0_849_10088">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(37.0001 37)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Center>
                <Box as="h1" textStyle={'headline4'}>
                  Project Submitted Successfully!{' '}
                </Box>
                <Box as="p" textStyle={'body3'} color="neutral.8">
                  Your project is under review and you will be notified soon.
                </Box>
              </CardHeader>
              <CardFooter>
                <Button
                  mx="auto"
                  variant={'connect_wallet'}
                  onClick={() => {
                    router.push({
                      pathname: '/projects/[projectId]',
                      query: { projectId: projectid },
                    });
                  }}
                >
                  View on Profile
                </Button>
              </CardFooter>
            </>
          )}
        </form>
      </Card>
    </Container>
  );
};

export default withAuth(SubmitProject, { redirect: '/' });
