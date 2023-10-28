import React, { FC} from 'react';
import Subhead from '@ui/components/subhead';
import { FilterLines } from '@ui/icons/svgs/filter-lines';

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
    <div className="mx-auto mt-8 w-full sm:w-2/3">
      <Subhead text="Projects" endElement={<FilterLines />} />
      {/* <div className="mt-2 flex space-x-2 overflow-y-scroll">
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
      </div> */}
      {/* <div className="mt-4 gap-2">
        {projects.map((project, index) => (
          <div key={project.id} className="flex max-w-lg flex-row justify-between gap-2">
            <div key={index} className="mb-2 flex gap-2 rounded-xl p-4">
              <img src={project.image} alt={project.name} className="w-20 h-20 mr-4 rounded-lg" />
              <Avatar
                className="min-w-fit rounded-[10px]"
                size="xl"
                shape="square"
                src={project.logo}
              />
              <div className="grow">
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
              className="mt-3 gap-2 rounded-[8px]"
              variant="outline"
            >
              <SaveIcon />
              Save
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProjectTabs;
