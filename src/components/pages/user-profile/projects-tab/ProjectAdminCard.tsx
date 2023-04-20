import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Stack,
} from '@chakra-ui/react';
import { ProjectsModel, ProjectVerifyStatus } from '@prisma/client';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import FundingOverview from './project-admin-dashboard/FundingOverview';
import Vault from './project-admin-dashboard/project-vault/Vault';
import ProjectInsights from './project-admin-dashboard/ProjectInsights';
import ProjectHeader from './ProjectHeader';
import ProjectStatusBanner from './ProjectStatusBanner';

const ProjectAdminCard = ({ project }: { project: ProjectsModel }) => {
  const [showVault, setShowVault] = useState(false);

  return (
    <Card
      px="0px"
      pt={
        status === 'inactive' ? { base: '16px', sm: '20px', md: '24px' } : '0px'
      }
      pb={{ base: '16px', sm: '20px', md: '24px' }}
      gap={{ base: '16px', sm: '20px', md: '24px' }}
      w="100%"
      border={'none'}
    >
      <ProjectStatusBanner status={project.status} />
      <CardHeader>
        <ProjectHeader project={project} />
      </CardHeader>
      {project.status === ProjectVerifyStatus.VERIFIED && (
        <>
          <CardBody
            gap={{ base: '64px', sm: '72px', md: '24px' }}
            borderTop={'1px solid'}
            borderColor="neutral.3"
          >
            <Stack
              gap={{ base: '64px', sm: '72px', md: '80px' }}
              padding={{ base: '16px', sm: '20px', md: '24px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <FundingOverview />
              <ProjectInsights />
            </Stack>
            {showVault && <Vault />}
          </CardBody>
          <CardFooter pb="24px">
            <Center w="full">
              <Button
                onClick={() => setShowVault(!showVault)}
                py="1rem"
                variant="outline"
                //ml={'auto'}
                rightIcon={
                  showVault ? (
                    <BiChevronUp size={20} />
                  ) : (
                    <BiChevronDown size={20} />
                  )
                }
              >
                <Box
                  textStyle={{ base: 'xs', md: 'sm' }}
                  ml={2}
                  fontWeight={600}
                >
                  {showVault ? 'Hide' : 'Show'} Vault Details
                </Box>
              </Button>
            </Center>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ProjectAdminCard;
