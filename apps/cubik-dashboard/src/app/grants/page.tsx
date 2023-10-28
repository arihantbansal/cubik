import React from 'react';
import { cookies } from 'next/headers';
import { IsUserLoginServer } from '@/utils/helpers/isUserLogin';

import { EventHeader } from './components/EventHeader';
import { TabsSection } from './components/Tabs';

const EventInfoPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken');
  if (!token) {
    return <>No Token Found</>;
  }
  const user = await IsUserLoginServer(token.value);
  if (!user) {
    return <>Login</>;
  }

  return (
    <>
      <EventHeader />
      <TabsSection />
    </>
  );
};
export default EventInfoPage;
