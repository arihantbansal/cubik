import { useState } from 'react';
import { useUserStore } from '~/store/userStore';

const useCheckVerifiedProfile = () => {
  const [verifiedProfile, setverifiedProfile] = useState(false);
  const { user } = useUserStore();
  const userProofs = JSON.stringify(user?.proof);
  console.log('user proofs - ', userProofs);

  return verifiedProfile;
};

export default useCheckVerifiedProfile;
