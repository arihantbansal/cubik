import React from "react";
import {
  FaTwitter,
  FaDiscord,
  FaTelegramPlane,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { HiLink } from "react-icons/hi";

export const SocialLinks = ({ urlName }: { urlName: string }) => {
  switch (urlName) {
    case "url":
      return <HiLink color="#E0FFFD" size={18} />;
    case "twitter":
      return <FaTwitter color="#E0FFFD" size={18} />;
    case "discord":
      return <FaDiscord color="#E0FFFD" size={18} />;
    case "telegram":
      return <FaTelegramPlane color="#E0FFFD" size={18} />;
    case "youtube":
      return <FaYoutube color="#E0FFFD" size={18} />;
    case "github":
      return <FaGithub color="#E0FFFD" size={18} />;
    default:
      return <></>;
  }
};
