'use client';

import { useState } from 'react';
import { EmptyStateHOC } from '@/app/components/common/empty-state/EmptyStateHOC';
import type {
  ProjectExploreBanner,
  ProjectExplorerType,
} from '@/types/explorer';
import { Wrap } from '@/utils/chakra';

import { ProjectCard } from './card';
import Filters from './filters';

const Projects = ({
  projects: _projects,
  banner,
}: {
  projects: ProjectExplorerType[];
  banner: ProjectExploreBanner[];
}) => {
  const [projects, setProjects] = useState<ProjectExplorerType[]>(_projects);

  return (
    <>
      <Filters
        banner={banner}
        _projects={_projects}
        projects={projects}
        setProjects={setProjects}
      />
      <Wrap
        overflow={'visible'}
        spacing={{ base: '1.8rem', md: '1.5rem' }}
        w="100%"
        margin="0"
        justify={'start'}
        align="center"
        direction={{ base: 'column', sm: 'row', md: 'row' }}
      >
        {projects.length > 0 ? (
          projects.map((project, key: React.Key | null | undefined) => {
            return <ProjectCard project={project} key={key} />;
          })
        ) : (
          <>
            <EmptyStateHOC
              margin="0"
              heading={'No Project Found'}
              subHeading={
                'We couldn`t find any projects matching your search. Please try a different query or check back later.'
              }
            />
          </>
        )}
      </Wrap>
    </>
  );
};

export default Projects;
