import React from 'react';

import {
  // Accordion,
  // AccordionContent,
  // AccordionItem,
  // AccordionTrigger,
  Button,
  Icon,
} from '@cubik/ui';

// const STATUS_DATA = [
//   { label: 'Total Raised', value: '$4.5k' },
//   { label: 'Unique Contributors', value: '143' },
//   { label: 'Rounds', value: '1' },
//   { label: 'Community Contributions', value: '$796.5' },
// ];
export const ProjectInfo = () => {
  return (
    <div className="flex grow flex-col overflow-scroll">
      <div className="bg-muted">
        <img src={'/projectBg.jpeg'} alt="project background" />

        <img
          src={'/projectLogo.jpeg'}
          alt="project background"
          className="mx-4 -mt-16 h-20 w-20 rounded-md"
        />
        <div className="space-y-3 px-4 py-3">
          <p className="text-2xl font-semibold">Superteam Earn</p>
          <p className="text-xs">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a
          </p>
          <div className="flex space-x-2 py-2">
            <Button
              variant="secondary"
              className="flex flex-1 space-x-1 bg-neutral-600"
            >
              <p>View Project on Cubik</p>
              <Icon
                name="externalLink"
                fill="none"
                stroke="#CCCCCC"
                height={14}
                width={14}
              />
            </Button>
            <Button className="flex-1 bg-white text-black" variant="outline">
              Visit Website
            </Button>
          </div>
        </div>
      </div>

      {/* <Tabs defaultValue="details" className="">
        <TabsList className="w-full  overflow-x-auto whitespace-nowrap bg-neutral-800">
          <div className="mx-auto w-full max-w-7xl">
            <TabsTrigger value="details">Details</TabsTrigger>

            <TabsTrigger value="emails">Emails</TabsTrigger>
          </div>
        </TabsList>
        <div className="mx-auto w-full max-w-7xl">
          <TabsContent value="details" className="bg-[#141414] px-4">
            <div className="py-4">
              <div>
                <p className="rounded-md bg-neutral-800 px-4 py-2 text-xs text-[#808080]">
                  <span className="text-yellow-500">Warning</span> The Project
                  had high number of sybil votes last round
                </p>
              </div>
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="py-2"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="py-4">
                    Approval Status
                  </AccordionTrigger>
                  <AccordionContent>blah blah</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="py-4">Stats</AccordionTrigger>
                  <AccordionContent>
                    <div className=" flex justify-between space-x-6 text-white">
                      {STATUS_DATA.map((item, index) => (
                        <React.Fragment key={item.label}>
                          <div className="flex flex-col ">
                            <span className="text-xs font-light text-gray-700">
                              {item.label}
                            </span>
                            <span className="text-lg font-medium">
                              {item.value}
                            </span>
                          </div>
                          {index !== STATUS_DATA.length - 1 && (
                            <div className="h-16 border-l border-gray-500"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className=" border-b border-gray-700 py-4 text-white">
                <h1 className="pb-4 text-xl">Team</h1>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={'/dhruvAvatar.jpeg'}
                        alt="Dhruv"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="text-lg font-semibold">@dhruv</div>
                        <div className="text-xs font-light text-gray-700">
                          dhruvraj@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-light text-gray-700">
                        Sybil Score
                      </div>
                      <div className="py-2 text-lg font-bold text-orange-500">
                        28
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={'/dhruvAvatar.jpeg'}
                        alt="Kash"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="text-lg font-semibold">@kashdandha</div>
                        <div className="text-xs font-light text-gray-700">
                          kash@superteam.fun
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-light text-gray-700">
                        Sybil Score
                      </div>
                      <div className="py-2 text-lg font-bold text-green-500">
                        45
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-white ">
                <h1 className="py-4 text-xl">Registration Questions</h1>

                <div>
                  <p className="text-sm text-neutral-600">
                    This is a question, add any answer to it.
                  </p>
                  <p className="font-light text-neutral-400">
                    Here you can see the answer to the question
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">
                    This is a question, add any answer to it.
                  </p>
                  <p className="font-light text-neutral-400">
                    Here you can see the answer to the question
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="emails">Change your password here.</TabsContent>
        </div>
      </Tabs> */}
    </div>
  );
};
