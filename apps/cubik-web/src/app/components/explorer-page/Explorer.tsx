"use client";
import { Container } from "@chakra-ui/react";
import { FC } from "react"
import Projects from "./Projects";
import { Input } from '@ui/components/input';


export const Explorer: FC = () => {
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

                </div>
            </div>
        </Container>
    )
}
