import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@cubik/ui";
import React from "react";
const STATUS_DATA = [
  { label: "Total Raised", value: "$4.5k" },
  { label: "Unique Contributors", value: "143" },
  { label: "Rounds", value: "1" },
  { label: "Community Contributions", value: "$796.5" },
];
export const ProjectInfo = () => {
  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <div className="bg-muted">
        <img src={"/projectBg.jpeg"} alt="project background" />

        <img
          src={"/projectLogo.jpeg"}
          alt="project background"
          className="h-20 w-20 rounded-md -mt-16 mx-4"
        />
        <div className="px-4 space-y-3 py-3">
          <p className="text-2xl font-semibold">Superteam Earn</p>
          <p className="text-xs">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a
          </p>
          <div className="flex py-2 space-x-2">
            <Button
              variant="secondary"
              className="bg-neutral-600 flex flex-1 space-x-1"
              size="sm"
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
            <Button className="bg-white text-black flex-1" size="sm">
              Visit Website
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="">
        <TabsList className="bg-neutral-800  w-full overflow-x-auto whitespace-nowrap">
          <div className="w-full max-w-7xl mx-auto">
            <TabsTrigger value="details">Details</TabsTrigger>

            <TabsTrigger value="emails">Emails</TabsTrigger>
          </div>
        </TabsList>
        <div className="w-full max-w-7xl mx-auto">
          <TabsContent value="details" className="bg-[#141414] px-4">
            <div className="py-4">
              <div>
                <p className="bg-neutral-800 text-xs px-4 py-2 rounded-md text-[#808080]">
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
                    <div className=" text-white space-x-6 flex justify-between">
                      {STATUS_DATA.map((item, index) => (
                        <React.Fragment key={item.label}>
                          <div className="flex flex-col ">
                            <span className="text-xs text-gray-700 font-light">
                              {item.label}
                            </span>
                            <span className="text-lg font-medium">
                              {item.value}
                            </span>
                          </div>
                          {index !== STATUS_DATA.length - 1 && (
                            <div className="border-l border-gray-500 h-16"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className=" text-white border-b border-gray-700 py-4">
                <h1 className="text-xl pb-4">Team</h1>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img
                        src={"/dhruvAvatar.jpeg"}
                        alt="Dhruv"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-lg font-semibold">@dhruv</div>
                        <div className="text-xs text-gray-700 font-light">
                          dhruvraj@gmail.com
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-700 font-light">
                        Sybil Score
                      </div>
                      <div className="text-lg font-bold text-orange-500 py-2">
                        28
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img
                        src={"/dhruvAvatar.jpeg"}
                        alt="Kash"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-lg font-semibold">@kashdandha</div>
                        <div className="text-xs text-gray-700 font-light">
                          kash@superteam.fun
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-700 font-light">
                        Sybil Score
                      </div>
                      <div className="text-lg font-bold text-green-500 py-2">
                        45
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-white ">
                <h1 className="text-xl py-4">Registration Questions</h1>

                <div>
                  <p className="text-sm text-neutral-600">
                    This is a question, add any answer to it.
                  </p>
                  <p className="text-neutral-400 font-light">
                    Here you can see the answer to the question
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">
                    This is a question, add any answer to it.
                  </p>
                  <p className="text-neutral-400 font-light">
                    Here you can see the answer to the question
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="emails">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
