import React, { FC, useState } from 'react';
import { Button } from '@ui/components/button';
import Subhead from '@ui/components/subhead';
import { Avatar } from '@ui/components/ui/Avatar/Avatar';
import { Tag } from '@ui/components/ui/tag';
import { FilterLines } from '@ui/icons/svgs/filter-lines';
import { SaveIcon } from '@ui/icons/svgs/save';
import { toast } from 'sonner';

import { Project } from '@cubik/database';

const ProjectTabs: FC<{ projects: Partial<Project>[] }> = ({ projects }) => {
  // Filter projects based on the selected tab
  // const filteredProjects = activeTab === 'Recommended'
  //     ? projectsData
  //     : projectsData.filter(project => project.tag.includes(activeTab.toLowerCase()));

  const categories = [
    'Recommended',
    'Defi',
    'NFTs',
    'Consumer',
    'Dev Tool',
    'Infrastructure',
  ];

  return (
    <div className="w-full sm:w-2/3 mx-auto mt-8">
      <Subhead text="Projects" endElement={<FilterLines />} />
      <div className="flex space-x-2 mt-2 overflow-y-scroll">
        {categories.map((category) => (
          <Tag
            // size="sm"
            key={category}
            selected={true}
            // selected={activeTab.toLowerCase() === category.toLowerCase()}
            text={category}
            // onClick={() => setActiveTab(category)}
            // className={`rounded-full bg-slate-800 text-white px-4 py-2 focus:outline-none ${activeTab === category ? 'bg-blue-700' : ''}`}
          >
            {category}
          </Tag>
        ))}
      </div>
      <div className="mt-4 gap-2">
        {projects.map((project, index) => (
          <div className="flex flex-row justify-between gap-2 max-w-lg">
            <div key={index} className="mb-2 rounded-xl p-4 gap-2 flex">
              {/* <img src={project.image} alt={project.name} className="w-20 h-20 mr-4 rounded-lg" /> */}
              <Avatar
                className="rounded-[10px] min-w-fit"
                size="xl"
                shape="square"
                src={project.logo}
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="mt-2">{project.shortDescription}</p>
              </div>
            </div>
            <Button
              onClick={() =>
                toast(`Saved ${project.name}`, {
                  style: {
                    background: '#000',
                    color: '#fff',
                  },
                })
              }
              className="gap-2 rounded-[8px] mt-3"
              variant="outline"
            >
              <SaveIcon />
              Save
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTabs;
