import {
  Box,
  Card,
  CardHeader,
  Center,
  Container,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ProjectsModel } from '@prisma/client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import CustomStepper from '~/components/common/stepper/CustomStepper';
import withAuth from '~/components/HOC/WithAuth';
import { StepOne, StepThree, StepTwo } from '~/components/pages/create-project';
import CreateProjectTransactionModal from '~/components/pages/create-project/TransactionSignModal';
import SEO from '~/components/SEO';
import { uploadToCloudinary } from '~/utils/upload';

type SubmitProjectProps = {
  onSubmit: (_project: Project) => void;
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
  email: string;
  team: {
    label: string;
    value: string;
  }[];
};

const SubmitProject: React.FC<SubmitProjectProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<string | null>(null);
  const [LoadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const {
    isOpen: isTransactionModalOpen,
    onOpen: onTransactionModalOpen,
    onClose: onTransactionModalClose,
  } = useDisclosure();

  const {
    control,
    register,
    handleSubmit,
    watch,
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
        description: string()
          .required("Description can't be empty")
          .max(30000, 'Must be at most 3000 characters'),
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
    goToNextStep();
  };

  const handleStepThreeSubmit = async (editorData: string) => {
    try {
      const imageUrl = await uploadToCloudinary(getValues('logo')).catch(
        (error) => {
          throw new Error(
            `Error uploading image to Cloudinary: ${error.message}`
          );
        }
      );
      setImageUrl(imageUrl);
      setEditorData(editorData);
      onTransactionModalOpen();
    } catch (e) {
      console.error('There was an error uploading the image', e);
    } finally {
      setLoadingSubmit(false);
    }
  };

  //@ts-ignore
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
        w={{ base: 'fit-content', md: 'full' }}
        rounded="full"
        border="1px solid #FFFFFF10"
        py="0.5rem"
        px="0.8rem"
        align={'center'}
        justify="start"
      >
        <Box as={motion.div}>
          <Center
            w={{ base: '0.8rem', md: '1.1rem' }}
            height={{ base: '0.8rem', md: '1.1rem' }}
            rounded="full"
            as="p"
            bg="white"
            color={'black'}
            textStyle={{ base: 'body6', md: 'body5' }}
          >
            {index}
          </Center>
        </Box>
        <Box
          as="p"
          whiteSpace="pre"
          display={{ base: 'block', md: 'block' }}
          textStyle={{ base: 'body6', md: 'body5' }}
          color={status === 'inactive' ? 'neutral.7' : 'brand.teal6'}
        >
          {name}
        </Box>
      </MotionHStack>
    );
  };

  return (
    <>
      <SEO
        title={`Submit Project - Cubik`}
        description={`Submit a new project and start receiving grants on cubik`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <Container
        transition="all .25s ease"
        maxW="full"
        p={{ base: '1rem', md: '0' }}
        my={{ base: '2rem', md: '5rem', lg: '6rem', xl: '8rem' }}
        outline="none"
      >
        <Card
          maxW={{ base: '28rem', md: '36rem' }}
          mx="auto"
          padding={{ base: '24px', md: '40px' }}
        >
          {!(step === 4) && (
            <>
              <CardHeader>
                <Box
                  as="h1"
                  color="neutral.11"
                  textStyle={{ base: 'title2', md: 'title1' }}
                >
                  Create New Project
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="neutral.9"
                >
                  Bring your vision to life! Create a project, receive grants
                  through public donations, and make an impact.
                </Box>
              </CardHeader>
              <HStack
                w="full"
                spacing={{ base: '0px', md: '8px' }}
                justify={{ base: 'center', md: 'space-between' }}
              >
                <CustomStepper
                  steps={[
                    { index: 1, name: 'Basic Information' },
                    { index: 2, name: 'Project Links' },
                    { index: 3, name: 'Detailed Info' },
                  ]}
                  currentStep={step}
                />
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
            {step === 4 && <>done...</>}
          </form>
        </Card>
      </Container>
      <CreateProjectTransactionModal
        getValues={getValues}
        isTransactionModalOpen={isTransactionModalOpen}
        onTransactionModalClose={onTransactionModalClose}
        imageUrl={imageUrl as string}
        editorData={editorData as string}
      />
    </>
  );
};

export default withAuth(SubmitProject, { redirect: '/' });
