import { Avatar, AvatarGroup, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ContributionsWithUserType } from '~/types/project';

const ProjectsContributorsNumber = ({
  projectId,
  contributorsList,
}: {
  projectId: string;
  contributorsList: ContributionsWithUserType[];
}) => {
  console.log('contributorsList', contributorsList);
  const [contributors, setContributors] = useState<
    ContributionsWithUserType[] | undefined
  >();
  // @irfan check if this works once just to be safe
  useEffect(() => {
    let contributorsData = [] as ContributionsWithUserType[];

    // filter out duplicate donations from the same user
    const userNames: { [key: string]: boolean } = {};
    contributorsData = contributorsList.filter((contribution) => {
      if (userNames[contribution.user.username]) {
        // This user has already made a donation, skip this donation
        return false;
      } else {
        // This user has not made a donation yet, include this donation and remember this user
        userNames[contribution.user.username] = true;
        return true;
      }
    });

    setContributors(contributorsData);
  }, [contributorsList]);

  console.log('contribution - ', contributors);
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
            {contributors.slice(-3).map((contribution) => (
              <Avatar
                key={contribution.id}
                outline="2px solid #0C0D0D"
                name={contribution.user.username}
                src={contribution.user.profilePicture}
              />
            ))}
          </AvatarGroup>
          <Box as="p" color="white" textStyle={{ base: 'body6', md: 'body5' }}>
            {contributors.length === 0
              ? '- -'
              : contributors.length > 3
              ? '+' + (contributors.length - 3)
              : ''}
          </Box>
        </Flex>
      ) : (
        <Box
          as="p"
          color="white"
          textStyle={{ base: 'body6', md: 'body5' }}
          fontWeight="600"
        >
          - -
        </Box>
      )}
    </>
  );
};

export default ProjectsContributorsNumber;
