"use client";
import { Container } from "@chakra-ui/react";
import { FC, useState } from "react";
import Projects from "./Projects";
import { Input } from '@ui/components/input';
import { Switch } from '@ui/components/Switch';
import { BaseCheckboxGroup } from '@ui/components/BaseCheckboxGroup';
import Toast from '@ui/components/Toast';
import { AvatarLabelGroup } from '@ui/components/Avatar/AvatarLabelGroup';
import { Dropdown } from '@ui/components/Dropdown';

export const Explorer: FC = () => {
    const [showToast, setShowToast] = useState(true);

    return (
        <Container mt="4.5rem" background="black" maxW="full" px="0">
            <div className="grid grid-cols-3">
                <div className="col-span-2 p-4">
                    <Projects />
                </div>
                <div className="col-span-1 p-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search projects, communities, people...."
                            className="py-2 pl-10 w-64 pr-4 rounded-full bg-slate-800 text-gray-500 focus:border-blue-500"
                        />
                        <div className="absolute top-0 left-0 mt-2 ml-3 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4">
                        <AvatarLabelGroup
                            avatarSrc="path_to_avatar_image" 
                            title="John Doe"
                            subtitle="Software Developer"
                            description="5 years of experience"
                            size="md"
                            variant={1}
                        />
                    </div>
                    <div className="mt-4">
                        <Dropdown colorScheme="secondary" size="sm"/>
                    </div>
                    <div className="mt-4">
                        <Switch size="sm" labelText="Enable Notifications" helperText="Turn on to receive notifications" />
                    </div>
                    <div className="mt-4">
                        <BaseCheckboxGroup
                            items={[
                                { id: '1', label: 'Checkbox 1', isChecked: false },
                                { id: '2', label: 'Checkbox 2', isChecked: false, indeterminate: true },
                                { id: '3', label: 'Checkbox 3', isChecked: false, isDisabled: true }
                            ]}
                            onChange={updatedItems => console.log(updatedItems)}
                        />
                    </div>
                    <div className="mt-6">
                        <Toast title="Notification" content="You have 3 new messages!" buttonText="View" onButtonClick={() => setShowToast(false)} />
                    </div>
                </div>
            </div>
        </Container>
    )
}
