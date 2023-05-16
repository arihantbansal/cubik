import { Avatar, AvatarGroup, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  ContributionsWithUserType,
  ProjectJoinRoundWithContributionsType,
} from '~/types/project';

const ProjectsContributorsNumber = ({
  projectJoinRound,
}: {
  projectJoinRound: ProjectJoinRoundWithContributionsType[];
}) => {
  const [contributors, setContributors] = useState<
    ContributionsWithUserType[] | null
  >(null);

  useEffect(() => {
    const contributorsData = projectJoinRound.reduce((all, joinedRound) => {
      return all.concat(joinedRound.fundingRound.Contribution);
    }, [] as ContributionsWithUserType[]);
    console.log('contributorsData', contributorsData);
    setContributors(contributorsData);
  }, [projectJoinRound]);

  return (
    <>
      {contributors ? (
        <Flex
          justify="end"
          align={'center'}
          flex="1"
          w={'full'}
          gap="4px"
          position="relative"
          zIndex="1"
        >
          <AvatarGroup size="xs" max={3}>
            {contributors.slice(0, 3).map((contribution) => (
              <Avatar
                key={contribution.id}
                outline="2px solid #0C0D0D"
                name={contribution.user.username}
                src={contribution.user.profilePicture}
              />
            ))}
          </AvatarGroup>
          <Box as="p" color="white" textStyle={{ base: 'body6', md: 'body5' }}>
            {contributors.length ? '+' + contributors.length : '- -'}
          </Box>
        </Flex>
      ) : (
        <Box
          as="p"
          color="white"
          textStyle={{ base: 'body6', md: 'body5' }}
          fontWeight="600"
        >
          {' '}
          - -{' '}
        </Box>
      )}
    </>
  );
};

export default ProjectsContributorsNumber;
