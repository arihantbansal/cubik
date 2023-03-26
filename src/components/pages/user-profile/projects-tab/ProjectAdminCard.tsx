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
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { UserProject } from '~/types/userProject';
import FundingOverview from './project-admin-dashboard/FundingOverview';
import Vault from './project-admin-dashboard/project-vault/Vault';
import ProjectInsights from './project-admin-dashboard/ProjectInsights';
import ProjectBanner from './ProjectBanner';
import ProjectHeader from './ProjectHeader';

const ProjectAdminCard = ({ project }: { project: UserProject }) => {
  const [showVault, setShowVault] = useState(false);
  return (
    <Card px="0px" pt={project.status ? '0px' : '24px'} pb="24px" gap="24px">
      <ProjectBanner status={project.status} />
      <CardHeader>
        <ProjectHeader project={project} />
      </CardHeader>
      {project.status === 'active' && (
        <>
          <CardBody borderTop={'1px solid'} borderColor="neutral.3">
            <Stack
              gap="80px"
              padding="24px"
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
