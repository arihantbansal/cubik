import { Button } from '@ui/components/button';
import Subhead from '@ui/components/subhead';
import React, { useState } from 'react';

const projectsData = [
    {
        "name": "Project 1",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "A decentralized finance (DeFi) project",
        "tag": ["defi"]
    },
    {
        "name": "Project 2",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "Consumer-focused application",
        "tag": ["consumer"]
    },
    {
        "name": "Project 3",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "Highly recommended tool for developers",
        "tag": ["recommended", "dev tool"]
    },
    {
        "name": "Project 4",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "Another DeFi platform",
        "tag": ["defi"]
    },
    {
        "name": "Project 5",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "Consumer product",
        "tag": ["consumer"]
    },
    {
        "name": "Project 6",
        "image": "image6.jpg",
        "description": "Recommended developer tool",
        "tag": ["recommended", "dev tool"]
    },
    {
        "name": "Project 7",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "Yet another DeFi project",
        "tag": ["defi"]
    },
    {
        "name": "Project 8",
        "image": "https://candypay.fun/assets/logo.png",
        "description": "Consumer-oriented service",
        "tag": ["consumer"]
    },
];

const ProjectTabs = () => {
    const [activeTab, setActiveTab] = useState('Recommended');

    // Filter projects based on the selected tab
    const filteredProjects = activeTab === 'Recommended'
        ? projectsData
        : projectsData.filter(project => project.tag.includes(activeTab.toLowerCase()));

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
            <Subhead/>
            <div className="flex space-x-2 mt-2">
                {categories.map(category => (
                    <Button
                        size="sm"
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`rounded-full bg-slate-800 text-white px-4 py-2 focus:outline-none ${activeTab === category ? 'bg-blue-700' : ''}`}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            <div className="mt-4">
                {filteredProjects.map((project, index) => (
                    <div>
                        <div key={index} className="mb-4 rounded-xl p-4 border border-gray-300 flex">
                            <img src={project.image} alt={project.name} className="w-20 h-20 mr-4" />
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                                <p className="mt-2">{project.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectTabs;
