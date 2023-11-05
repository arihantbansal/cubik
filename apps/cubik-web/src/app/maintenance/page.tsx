import { Text, VStack } from '@/utils/chakra'
import React from 'react'

const MaintenancePage = () => {
  return (
    <VStack w="full" h={"100vh"} display={"flex"} justify={"center"} >
        <Text fontSize={"2xl"}>The site is in Maintenance</Text>
    </VStack>
  )
}

export default MaintenancePage
