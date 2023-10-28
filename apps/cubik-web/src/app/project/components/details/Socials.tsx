import React from 'react';
import { Box, HStack, VStack } from '@/utils/chakra';

interface Props {
  discordLink?: string;
  twitterHandle?: string;
  telegramLink?: string;
  githubLink?: string;
  projectLink?: string;
}

export const Socials = ({
  discordLink,
  projectLink,
  githubLink,
  twitterHandle,
}: Props) => {
  function getGithubRepoName(url: string) {
    const parsedUrl = new URL(url);
    if (parsedUrl.host !== 'github.com') {
      return 'Not a GitHub URL';
    }

    const pathParts = parsedUrl.pathname
      .split('/')
      .filter((part) => part.length > 0);

    if (pathParts.length < 2) {
      return parsedUrl.pathname.replace('/', '');
    }

    return `${pathParts[0]}/${pathParts[1]}`;
  }
  function getTwitterName(url: string) {
    const parsedUrl = new URL(url);
    if (parsedUrl.host !== 'twitter.com' && parsedUrl.host !== 'x.com') {
      return 'Not a GitHub URL';
    }

    const pathParts = parsedUrl.pathname
      .split('/')
      .filter((part) => part.length > 0);

    if (pathParts.length < 1) {
      return 'Invalid Twitter URL';
    }

    return pathParts[0];
  }
  return (
    <>
      <VStack gap={4} align={'start'} w="full">
        <HStack align={'start'}>
          <Box>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8V13.5C16 14.8807 17.1193 16 18.5 16C20.6808 16 21 13.7332 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C13.0519 21 14.0617 20.8195 15 20.4879M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box color={'white'} fontSize={'xl'} fontWeight={700}>
            Socials
          </Box>
        </HStack>

        {projectLink && (
          <HStack
            p={5}
            gap={5}
            w={'full'}
            border={'1px solid'}
            borderColor={'#383301'}
            borderRadius={10}
            bg="rgba(0, 0, 0, 0.20)"
            overflow={'hidden'}
          >
            <Box>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.84998 12.0001H21.15M2.84998 12.0001C2.84998 17.0535 6.94657 21.1501 12 21.1501M2.84998 12.0001C2.84998 6.94669 6.94657 2.8501 12 2.8501M21.15 12.0001C21.15 17.0535 17.0534 21.1501 12 21.1501M21.15 12.0001C21.15 6.94669 17.0534 2.8501 12 2.8501M12 2.8501C14.2886 5.35569 15.5893 8.60731 15.66 12.0001C15.5893 15.3929 14.2886 18.6445 12 21.1501M12 2.8501C9.7113 5.35569 8.41066 8.60731 8.33998 12.0001C8.41066 15.3929 9.7113 18.6445 12 21.1501"
                  stroke="#FFE818"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Box
              noOfLines={1}
              fontSize={'lg'}
              color={'#FFE818'}
              fontWeight={600}
            >
              {projectLink}
            </Box>
          </HStack>
        )}

        {githubLink && (
          <HStack
            p={5}
            gap={5}
            overflow={'hidden'}
            w={'full'}
            border={'1px solid'}
            borderColor={'#400253'}
            borderRadius={10}
            bg="rgba(0, 0, 0, 0.20)"
          >
            <Box>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14.9993C9.34732 15.6987 8.98919 16.6227 9 17.5793V20.9993M14 14.9993C14.6527 15.6987 15.0108 16.6227 15 17.5793V20.9993M9 19.0493C8.10549 19.4055 7.13532 19.5294 6.18 19.4093C4.66 18.8893 5.06 17.5093 4.28 16.9393C3.90518 16.6713 3.46037 16.5184 3 16.4993M19 9.74927C19 12.7493 17.05 14.9993 12 14.9993C6.95 14.9993 5 12.7493 5 9.74927C4.9753 8.70844 5.20893 7.67772 5.68 6.74927C5.34 5.27927 5.47 3.46927 6.2 3.10927C6.93 2.74927 8.47 3.40927 9.74 4.25927C10.486 4.12615 11.2422 4.05922 12 4.05927C12.7572 4.05262 13.5134 4.11285 14.26 4.23927C15.53 3.38927 17.14 2.75927 17.8 3.08927C18.46 3.41927 18.66 5.25927 18.32 6.72927C18.7943 7.66371 19.028 8.70171 19 9.74927Z"
                  stroke="#D14AFA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Box
              noOfLines={1}
              fontSize={'lg'}
              color={'#D14AFA'}
              fontWeight={600}
            >
              {getGithubRepoName(githubLink)}
            </Box>
          </HStack>
        )}

        {twitterHandle && (
          <HStack
            p={5}
            overflow={'hidden'}
            gap={5}
            w={'full'}
            border={'1px solid'}
            borderColor={'#004A5A'}
            borderRadius={10}
            bg="rgba(0, 0, 0, 0.20)"
          >
            <Box>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7994 3L13.5823 10.1053M4.04941 21L10.681 13.4211M13.5823 10.1053L9.26678 4.01276C9.00411 3.64193 8.87277 3.45652 8.70303 3.32255C8.55272 3.20392 8.38109 3.11516 8.19741 3.06108C7.98997 3 7.76275 3 7.30832 3H5.61995C4.86963 3 4.49447 3 4.29221 3.15573C4.11609 3.29132 4.00919 3.49805 4.00034 3.72013C3.99018 3.9752 4.20702 4.28134 4.64072 4.89362L10.681 13.4211M13.5823 10.1053L19.9581 19.1064C20.3918 19.7187 20.6086 20.0248 20.5985 20.2799C20.5896 20.502 20.4827 20.7087 20.3066 20.8443C20.1043 21 19.7292 21 18.9789 21H17.2905C16.8361 21 16.6088 21 16.4014 20.9389C16.2177 20.8848 16.0461 20.7961 15.8958 20.6775C15.726 20.5435 15.5947 20.3581 15.332 19.9872L10.681 13.4211"
                  stroke="#00D1FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Box
              noOfLines={1}
              fontSize={'lg'}
              color={'#00D1FF'}
              fontWeight={600}
            >
              {getTwitterName(twitterHandle)}
            </Box>
          </HStack>
        )}

        {discordLink && (
          <HStack
            p={5}
            gap={5}
            overflow={'hidden'}
            w={'full'}
            border={'1px solid'}
            borderColor={'#004A5A'}
            borderRadius={10}
            bg="rgba(0, 0, 0, 0.20)"
          >
            <Box>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7994 3L13.5823 10.1053M4.04941 21L10.681 13.4211M13.5823 10.1053L9.26678 4.01276C9.00411 3.64193 8.87277 3.45652 8.70303 3.32255C8.55272 3.20392 8.38109 3.11516 8.19741 3.06108C7.98997 3 7.76275 3 7.30832 3H5.61995C4.86963 3 4.49447 3 4.29221 3.15573C4.11609 3.29132 4.00919 3.49805 4.00034 3.72013C3.99018 3.9752 4.20702 4.28134 4.64072 4.89362L10.681 13.4211M13.5823 10.1053L19.9581 19.1064C20.3918 19.7187 20.6086 20.0248 20.5985 20.2799C20.5896 20.502 20.4827 20.7087 20.3066 20.8443C20.1043 21 19.7292 21 18.9789 21H17.2905C16.8361 21 16.6088 21 16.4014 20.9389C16.2177 20.8848 16.0461 20.7961 15.8958 20.6775C15.726 20.5435 15.5947 20.3581 15.332 19.9872L10.681 13.4211"
                  stroke="#00D1FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Box
              noOfLines={1}
              fontSize={'lg'}
              color={'#00D1FF'}
              fontWeight={600}
            >
              {discordLink}
            </Box>
          </HStack>
        )}
      </VStack>
    </>
  );
};
