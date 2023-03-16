export interface User {
  id: string;
  username: string;
  mainWallet: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDetails extends User {
  firstName?: string;
  lastName?: string;
  wallets: any;
  bio?: string;
  email?: string;
  website?: string;
  twitterHandle?: string;
  githubHandle?: string;
  linkedinUrl?: string;
  telegramHandle?: string;
}
