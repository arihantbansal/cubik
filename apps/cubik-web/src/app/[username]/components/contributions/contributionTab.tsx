import React from 'react';
import Link from 'next/link';
import { EmptyStateHOC } from '@/app/components/common/empty-state/EmptyStateHOC';
import { Button, Center } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { ContributionRow } from './ContributionRow';
import { ContributionTable } from './ContributionTable';

const getContribution = async (username: string) => {
  return await prisma.contribution.findMany({
    where: {
      user: {
        username: username,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      totalAmount: true,
      totalUsdAmount: true,
      createdAt: true,
      token: true,
      id: true,
      project: {
        select: {
          name: true,
          industry: true,
          logo: true,
          owner: {
            select: {
              username: true,
            },
          },
        },
      },
      round: {
        select: {
          name: true,
        },
      },
      hackathon: {
        select: {
          name: true,
        },
      },
    },
  });
};

const ContributionPage = async ({ username }: { username: string }) => {
  const contribution = await getContribution(username);
  if (contribution.length === 0) {
    return (
      <Center
        w="full"
        border="1px dashed"
        borderColor={'neutral.3'}
        rounded="12px"
      >
        <EmptyStateHOC
          heading={'No Contributions Yet'}
          subHeading={
            'This project hasn`t received any contributions yet. Be the first to support this project!'
          }
          CTA={
            <Link href="/projects">
              <Button
                variant="cubikFilled"
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
              >
                Make a contribution
              </Button>
            </Link>
          }
        />
      </Center>
    );
  }
  return (
    <>
      <ContributionTable>
        {contribution.map((contribution) => {
          return (
            <ContributionRow
              key={contribution.id}
              amountRaised={0}
              token={contribution.token}
              tokenAmount={contribution.totalAmount}
              usdAmount={contribution.totalUsdAmount}
              isLoading={false}
              createdAt={contribution.createdAt.toString()}
              eventName={
                contribution.round?.name || contribution.hackathon?.name || '' // update schema and
              }
              projectIndustry={contribution.project.industry}
              projectLogo={contribution.project.logo}
              projectName={contribution.project.name}
              projectOwner={contribution.project.owner.username as string}
            />
          );
        })}
      </ContributionTable>
    </>
  );
};

export default ContributionPage;
