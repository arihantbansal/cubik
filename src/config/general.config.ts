type ConfigInterface = {
  general: {
    name: string;
    domain: string;
    twitterHandle: string;
  };
};
const config: ConfigInterface = {
  general: {
    name: 'cubik',
    domain: 'devnet.cubik.so',
    twitterHandle: '@_cubik',
  },
};

export default config;
