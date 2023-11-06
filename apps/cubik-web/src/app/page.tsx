import type { Metadata } from 'next';
import Link from 'next/link';

import { prisma } from '@cubik/database';
import { Icon, ProjectCard, SaveButton, SubHead } from '@cubik/ui';

export const metadata: Metadata = {
  title: 'Cubik',
  metadataBase: new URL('https://res.cloudinary.com'),
  description: 'Fund Public Goods Through Community Voting On Solana',
  openGraph: {
    images: ['/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png'],
  },
  twitter: {
    title: 'Cubik',
    card: 'summary_large_image',
    images: ['/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png'],
  },
};
const getProjects = async () => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      shortDescription: true,
    },
    take: 30,
  });
  return projects;
};
export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <div className="mt-20 flex min-h-screen w-full flex-col items-center  lg:flex-row 2xl:mx-auto 2xl:max-w-7xl">
        <div className="h-full w-full lg:w-2/3">
          <div className="px-6 pt-10 lg:px-20">
            <SubHead
              heading="Projects"
              size="lg"
              leftElement={
                <Icon
                  name="filter"
                  className="stroke-[var(--color-neutral-500)]"
                />
              }
            />
          </div>
          <div className="flex flex-col lg:px-14">
            {projects.map((project) => {
              return (
                <ProjectCard
                  Button={<SaveButton />}
                  description={project.shortDescription}
                  name={project.name}
                  logo={project.logo}
                  key={project.id}
                />
              );
            })}
          </div>
        </div>
        <div className="block h-full w-full border-l border-[var(--color-bg-tertiary)] px-4 py-3 lg:fixed lg:right-0 lg:top-24 lg:w-1/3 lg:px-10 lg:py-8 xl:px-20 2xl:block ">
          <SubHead
            heading="Collection"
            size="lg"
            icon={<Icon name="grid" className="fill-none stroke-white" />}
            leftElement={
              <Link
                href={'/'}
                className="text-[12px] font-medium leading-4 text-blue-500"
              >
                View More
              </Link>
            }
          />
        </div>
      </div>
    </>
  );
}
