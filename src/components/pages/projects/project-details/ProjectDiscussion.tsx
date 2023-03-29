import {
  Avatar,
  Button,
  HStack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
interface CommentType {
  id: string;
  name: string;
  avatar: string;
  date: number;
  message: string;
}
const Discussions = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [message, setMessage] = useState<string>('');
  return (
    <>
      <VStack w={'full'} mt={6}>
        <Textarea
          h={32}
          minH={32}
          placeholder="Start wrting here....."
          border={'1px solid white'}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <HStack w={'full'} align={'end'} justify={'end'}>
          <Button
            onClick={() => {
              //   if (!user) return null;
              //   setComments([
              //     ...comments,
              //     {
              //       avatar: user?.icon as string,
              //       date: Date.now(),
              //       id: uuidV4(),
              //       message: message,
              //       name: user?.username as string,
              //     },
              //   ]);
              setMessage('');
            }}
            backgroundColor={'#D645A6 !important'}
            color="white"
            py={{ base: '1rem', md: '1.2rem' }}
            px={{ base: '1rem', md: '1.6rem' }}
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="700"
          >
            Comment
          </Button>
        </HStack>
      </VStack>
      <VStack align={'start'} w={'full'}>
        {comments?.map((el) => {
          const date = new Date(el.date);
          return (
            <HStack key={el.id} align={'start'} px={6}>
              <Avatar
                size={'sm'}
                src={
                  'https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png'
                }
              />

              <VStack align={'start'}>
                <HStack>
                  <Text fontWeight={600}>{el.name}</Text>
                  <Text color={'#94A3B8'} fontWeight={500}>
                    {date.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </HStack>
                <Text mt={'0px !important'}>{el.message}</Text>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};

export default Discussions;
