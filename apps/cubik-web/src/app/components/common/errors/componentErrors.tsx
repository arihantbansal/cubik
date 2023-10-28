import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Center,
} from '@/utils/chakra';

//import { BiError } from "react-icons/bi";

const ComponentErrors = ({ error }: any) => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none" outline="none">
        <AccordionButton>
          <Center py="1rem" w="full" gap="12px">
            {/*  @todo  */}
            {/* <BiError size={18} color="#626665" /> */}
            <Box
              as="p"
              textStyle={{ base: 'body4', md: 'body4' }}
              color="neutral.7"
            >
              There was some error
            </Box>
          </Center>
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Alert maxW="30rem" mx="auto" status="error" variant="cubik">
            <AlertIcon />
            <AlertDescription
              fontSize={{ base: '10px', md: '11px', xl: '12px' }}
              lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
            >
              {error?.message || 'Unknown error occurred'}
            </AlertDescription>
          </Alert>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentErrors;
