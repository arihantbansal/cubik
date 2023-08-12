import React from "react";
import { ContributionTable } from "../components/user/ContributionTable";
import { ContributionRow } from "../components/user/ContributionRow";
import { prisma } from "@cubik/database";

const getContribution = async (username: string) => {
  return await prisma.contribution.findMany({
    where: {
      User: {
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
      Project: {
        select: {
          name: true,
          industry: true,
          logo: true,
          Owner: {
            select: {
              username: true,
            },
          },
        },
      },
      Round: {
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
                contribution.Round?.name || "hackathon name" // update schema and
              }
              projectIndustry={contribution.Project.industry}
              projectLogo={contribution.Project.logo}
              projectName={contribution.Project.name}
              projectOwner={contribution.Project.Owner.username as string}
            />
          );
        })}
      </ContributionTable>
    </>
  );
};

export default ContributionPage;
