import {
  Box,
  Card,
  CardHeader,
  Center,
  Container,
  HStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import { StepOne, StepThree, StepTwo } from '~/components/pages/create-project';

type SubmitProjectProps = {
  onSubmit: (project: Project) => void;
};
type Project = any;
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
  const {
    control,
    register,
    handleSubmit,
    watch,
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
        category: array().of(
          object({
            label: string().required(),
            value: string().required(),
            colorScheme: string().required(),
          })
        ),
        twitter: string(),
        github: string().required("Project Github can't be empty"),
        projectLink: string().required("Project Link can't be empty"),
        telegram: string(),
        discord: string(),
        description: string().required(),
      })
    ),
    mode: 'onChange',
  });

  const goToNextStep = () => setStep(step + 1);

  const handleStepOneSubmit = (data: any) => {
    console.log('step one was submitted here is the data - ', data);
    // setValue('logo', data.logo[0]);
    console.log('go to next step');
    goToNextStep();
  };

  const goToPreviousStep = () => setStep(step - 1);

  const handleStepTwoSubmit = (data: any) => {
    goToNextStep();
  };

  const handleStepThreeSubmit = (data: any) => {
    const project: Project = {
      projectName: data.projectName,
      tagline: data.tagline,
      logo: data.logo[0],
      socials: {
        twitter: data.twitter,
        github: data.github,
        projectLink: data.projectLink,
        discord: data.discord,
      },
      description: data.description,
    };
    onSubmit(project);
  };

  const ProjectTimeline = ({
    index,
    name,
  }: {
    index: number;
    name: string;
  }) => {
    return (
      <HStack
        bg={
          step < index
            ? 'transparent'
            : step === index
            ? 'brand.teal2'
            : 'brand.teal4'
        }
        w="full"
        rounded="full"
        border="1px solid #FFFFFF10"
        py="0.5rem"
        px="0.8rem"
        align={'center'}
        justify="start"
      >
        <Center
          w="1.1rem"
          height="1.1rem"
          rounded="full"
          as="p"
          bg="white"
          color="black"
          backgroundColor={step < index ? 'neutral.7' : 'brand.teal6'}
          textStyle={'body5'}
        >
          {index}
        </Center>
        <Box
          as="p"
          textStyle={'body5'}
          color={step < index ? 'neutral.7' : 'brand.teal6'}
        >
          {name}
        </Box>
      </HStack>
    );
  };

  return (
    <Container maxW="full" p="0" my="10rem">
      <Card maxW="36rem" mx="auto">
        <CardHeader>
          <Box as="h1" textStyle={'title1'}>
            Create New Project
          </Box>
          <Box as="p" textStyle={'body4'} color="neutral.9">
            Bring your vision to life! Create a project, receive grants through
            public donations, and make an impact.
          </Box>
        </CardHeader>
        <HStack w="full" justify="space-between">
          <ProjectTimeline index={1} name={'Basic Information'} />
          <ProjectTimeline index={2} name={'Basic Information'} />
          <ProjectTimeline index={3} name={'Basic Information'} />
        </HStack>
        <form
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
              onSubmit={handleStepTwoSubmit}
              register={register}
              onPrevious={goToPreviousStep}
              errors={errors}
            />
          )}
          {step === 3 && <StepThree onPrevious={goToPreviousStep} />}
        </form>
      </Card>
    </Container>
  );
};

export default SubmitProject;
