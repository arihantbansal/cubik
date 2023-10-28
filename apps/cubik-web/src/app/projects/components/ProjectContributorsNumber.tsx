import { Avatar, AvatarGroup, Box, Flex } from '@/utils/chakra';

export interface ContributionType {
  id: string;
  user: {
    profilePicture: string;
    username: string;
  };
}

const ProjectsContributorsNumber = ({
  contributors,
  contributorsCount,
}: {
  contributors: {
    user: {
      profilePicture: string | null;
    };
  }[];
  contributorsCount: number;
}) => {
  return (
    <>
      {contributors.length > 0 ? (
        <Flex
          justify="end"
          align={'center'}
          flex="1"
          w={'fit-content'}
          gap="4px"
          position="relative"
          zIndex="1"
        >
          <AvatarGroup size="xs" spacing="-16px" max={3}>
            {contributors.slice(-3).map((user, id) => (
              <Avatar
                key={id}
                outline="2px solid #0C0D0D"
                src={user.user.profilePicture ?? ''}
              />
            ))}
          </AvatarGroup>
          {contributorsCount > 3 ? (
            <Box
              noOfLines={1}
              w="full"
              minW={contributorsCount > 80 ? 12 : 8}
              as="p"
              color="white"
              textStyle={{ base: 'body6', md: 'body5' }}
            >
              + {contributorsCount}
            </Box>
          ) : (
            <></>
          )}
        </Flex>
      ) : (
        <Box
          as="p"
          color="white"
          textStyle={{ base: 'body6', md: 'body5' }}
          fontWeight="600"
        >
          --
        </Box>
      )}
    </>
  );
};

export default ProjectsContributorsNumber;
