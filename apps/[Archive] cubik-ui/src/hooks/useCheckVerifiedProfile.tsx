import { useState } from "react";
import { useUserStore } from "~/store/userStore";

const useCheckVerifiedProfile = () => {
  const [verifiedProfile, setverifiedProfile] = useState(false);
  const { user } = useUserStore();
  const userProofs = JSON.stringify(user?.proof);

  return verifiedProfile;
};

export default useCheckVerifiedProfile;
