import React from "react";
import { ContributionTable } from "../components/user/ContributionTable";
import { ContributionRow } from "../components/user/ContributionRow";
import { prisma } from "@cubik/database";

const getContribution = async (username: string) => {
  return await prisma.contribution.findMany({
    where: {
      user: {
        username: username,
      },
    },
    orderBy: {
      createdAt: "desc",
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
    },
  });
};

const ContributionPage = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const contribution = await getContribution(username);
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
                contribution.round?.name || "hackathon name" // update schema and
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
