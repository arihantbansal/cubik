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
      usdTotal: true,
      total: true,
      createdAt: true,
      token: true,
      id: true,
      ProjectsModel: {
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
      Round: {
        select: {
          roundName: true,
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
              tokenAmount={contribution.total}
              usdAmount={contribution.usdTotal}
              isLoading={false}
              createdAt={contribution.createdAt.toString()}
              eventName={
                contribution.Round?.roundName || "hackathon name" // update schema and
              }
              projectIndustry={contribution.ProjectsModel.industry}
              projectLogo={contribution.ProjectsModel.logo}
              projectName={contribution.ProjectsModel.name}
              projectOwner={contribution.ProjectsModel.owner.username as string}
            />
          );
        })}
      </ContributionTable>
    </>
  );
};

export default ContributionPage;
