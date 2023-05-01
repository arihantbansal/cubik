import {
  Container,
  FormControl,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import ExplorePageHeader from '~/components/pages/projects/ExplorePageHeader';
import ProjectsList from '~/components/pages/projects/ProjectsList';
import ProjectListLoadingSkeleton from '~/components/pages/projects/skeletons/ProjectListLoadingSkeleton';
import { category } from '~/components/pages/create-project/projectCategories';
import { trpc } from '~/utils/trpc';
import { Select } from 'chakra-react-select';

type projectsPropsType = {
  allProjectsData: {
    data: any;
  };
};

const ProjectsCategoryFilter = () => {
  const { control } = useForm();
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
    'gray',
  ];

  const categoryWithColors = category.map((item, index) => {
    return {
      ...item,
      colorScheme: colors[Math.floor(Math.random() * colors.length)],
    };
  });
  return (
    <HStack>
      <Controller
        control={control}
        name="category"
        rules={{ required: 'Please enter at least 1 Tag.' }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error },
        }) => (
          <FormControl isRequired isInvalid={!!error} id="category">
            <Select
              isMulti
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              options={categoryWithColors}
              placeholder="Search Categories..."
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              variant="unstyled"
              focusBorderColor="transparent"
            />
          </FormControl>
        )}
      />
    </HStack>
  );
};

const Projects = (_props: projectsPropsType) => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findMany.useQuery();

  return (
    <main>
      <Container
        px={{ base: '1.5rem', sm: '2rem', md: '2rem', xl: '0px' }}
        maxW="7xl"
        py={{ base: '2rem', md: '3rem' }}
      >
        <VStack w="full" alignItems={'start'} justifyContent="start" gap="2rem">
          <ExplorePageHeader />
          <Tabs variant={'cubik'} w="full">
            <TabList>
              <Tab>Projects</Tab>
              <Tab>Collections</Tab>
            </TabList>
            <TabPanels>
              <TabPanel overflow={'visible'}>
                <ProjectsCategoryFilter />
                {isLoading || !projects ? (
                  <ProjectListLoadingSkeleton />
                ) : (
                  <ProjectsList allProjectsData={projects} />
                )}
              </TabPanel>
              <TabPanel>{isLoading || !projects ? '' : ''}</TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </main>
  );
};
export default Projects;
