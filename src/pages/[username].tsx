import { Container } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import SEO from 'src/components/SEO';
import AdminView from '~/components/pages/user-profile/AdminView';
import { User } from '~/types/user';

type profilePropsType = {
  user: User;
};

const ProfilePage = (props: profilePropsType) => {
  const { data: session } = useSession();
  return (
    <>
      <SEO
        title={`@${props.user.username}`}
        description={`${props.user.username} is Contributing to public good on Cubik`}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />
      <Container maxW="7xl" p="0">
        {session?.user.username === props.user.username && (
          <AdminView user={props.user} />
        )}
      </Container>
    </>
  );
};

export default ProfilePage;

export async function getServerSideProps(context: { query: any }) {
  const { query } = context;
  const { username } = query;

  try {
    // const user = await getUser({
    //   type: QUERY_TYPE.USER_NAME,
    //   value: username,
    // });
    const user = {
      id: '',
      username: query.username,
      verified: true,
      icon: '',
      mainwallet: 'CgAK5s4aqQNWqxE3MKvzGLJ6fj7nm83uWDDMuiZQ85ik',
      projects: [
        {
          id: 'aasdfqQasdfasdfasdfasdfuWsdf',
          logo: 'https://www.anchor-lang.com/_next/image?url=%2Flogo.png&w=32&q=75', //
          project_name: 'Anchor', //
          long_description:
            'Our project aims to reduce plastic waste in oceans by organizing clean-up campaigns and promoting awareness about the harmful effects of plastic pollution.',
          owner_publickey: '0xABCDEF1234567890',
          short_description: 'Reduce plastic waste in oceans',
          socials: {
            twitter: 'https://twitter.com/cleanocean',
            facebook: 'https://facebook.com/cleanocean',
            instagram: 'https://instagram.com/cleanocean',
          },
          project_link: 'https://www.anchor-lang.com/',
          status: 'pending',
          contributions: [
            {
              id: 'contribution-1',
              amount: 10,
              date: '2023-03-17T08:30:00Z',
              token: 'SOL',
            },
            {
              id: 'contribution-2',
              amount: 25,
              token: 'USDC',
              date: '2023-03-18T10:15:00Z',
            },
            {
              id: 'contribution-3',
              amount: 5,
              token: 'SOL',
              date: '2023-03-19T14:20:00Z',
            },
            {
              id: 'contribution-4',
              amount: 50,
              token: 'USDC',
              date: '2023-03-20T16:45:00Z',
            },
            {
              id: 'contribution-5',
              amount: 15,
              token: 'SOL',
              date: '2023-03-21T12:10:00Z',
            },
            {
              id: 'contribution-6',
              amount: 30,
              token: 'SOL',
              date: '2023-03-22T09:30:00Z',
            },
            {
              id: 'contribution-7',
              amount: 20,
              token: 'SOL',
              date: '2023-03-23T11:40:00Z',
            },
          ],
          estimated_matching_amount: 100,
          visitors: [
            {
              date: '2023-03-17',
              count: 50,
            },
            {
              date: '2023-03-18',
              count: 75,
            },
            {
              date: '2023-03-19',
              count: 60,
            },
            {
              date: '2023-03-20',
              count: 80,
            },
            {
              date: '2023-03-21',
              count: 70,
            },
            {
              date: '2023-03-22',
              count: 90,
            },
            {
              date: '2023-03-23',
              count: 100,
            },
          ],
        },
        {
          id: 'aasdfqQasdfasdfasdfasdfuWsdf',
          logo: 'https://pbs.twimg.com/profile_images/1586664639420669954/ylJNoL39_400x400.jpg', //
          project_name: 'Superteam Earn', //
          long_description:
            'Our project aims to reduce plastic waste in oceans by organizing clean-up campaigns and promoting awareness about the harmful effects of plastic pollution.',
          owner_publickey: '0xsdfsd1234567sdfsd',
          short_description: 'Reduce plastic waste in oceans',
          socials: {
            twitter: 'https://twitter.com/cleanocean',
            facebook: 'https://facebook.com/cleanocean',
            instagram: 'https://instagram.com/cleanocean',
          },
          project_link: 'https://earn.superteam.fun/',
          status: 'draft',
        },
        {
          id: 'aasdfqQasdfasdfasdfasdfuWsdf',
          logo: 'https://pbs.twimg.com/profile_images/1586664639420669954/ylJNoL39_400x400.jpg', //
          project_name: 'Superteam Earn', //
          long_description:
            'Our project aims to reduce plastic waste in oceans by organizing clean-up campaigns and promoting awareness about the harmful effects of plastic pollution.',
          owner_publickey: '0xsdfsd1234567sdfsd',
          short_description: 'Reduce plastic waste in oceans',
          socials: {
            twitter: 'https://twitter.com/cleanocean',
            facebook: 'https://facebook.com/cleanocean',
            instagram: 'https://instagram.com/cleanocean',
          },
          project_link: 'https://earn.superteam.fun/',
          status: 'rejected',
        },
        {
          id: 'aqQNWqxE3MKvzGLJ6fj7nm83uW',
          logo: 'https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg', //
          project_name: 'Gum', //
          long_description:
            'Our project aims to reduce plastic waste in oceans by organizing clean-up campaigns and promoting awareness about the harmful effects of plastic pollution.',
          owner_publickey: '0xABCDEF1234567890',
          short_description: 'Reduce plastic waste in oceans',
          socials: {
            twitter: 'https://twitter.com/cleanocean',
            facebook: 'https://facebook.com/cleanocean',
            instagram: 'https://instagram.com/cleanocean',
          },
          project_link: 'https://gum.fun/projects/clean-ocean',
          status: 'active',
          contributions: [
            {
              id: 'contribution-1',
              amount: 10,
              date: '2023-03-17T08:30:00Z',
              token: 'SOL',
            },
            {
              id: 'contribution-2',
              amount: 25,
              token: 'USDC',
              date: '2023-03-18T10:15:00Z',
            },
            {
              id: 'contribution-3',
              amount: 5,
              token: 'SOL',
              date: '2023-03-19T14:20:00Z',
            },
            {
              id: 'contribution-4',
              amount: 50,
              token: 'USDC',
              date: '2023-03-20T16:45:00Z',
            },
            {
              id: 'contribution-5',
              amount: 15,
              token: 'SOL',
              date: '2023-03-21T12:10:00Z',
            },
            {
              id: 'contribution-6',
              amount: 30,
              token: 'SOL',
              date: '2023-03-22T09:30:00Z',
            },
            {
              id: 'contribution-7',
              amount: 20,
              token: 'SOL',
              date: '2023-03-23T11:40:00Z',
            },
          ],
          estimated_matching_amount: 100,
          visitors: [
            {
              date: '2023-03-17',
              count: 50,
            },
            {
              date: '2023-03-18',
              count: 75,
            },
            {
              date: '2023-03-19',
              count: 60,
            },
            {
              date: '2023-03-20',
              count: 80,
            },
            {
              date: '2023-03-21',
              count: 70,
            },
            {
              date: '2023-03-22',
              count: 90,
            },
            {
              date: '2023-03-23',
              count: 100,
            },
          ],
        },
      ],
    };

    if (!user) {
      return {
        notFound: true,
      };
    }
    return {
      props: { user },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
