import type { TokenInfo } from '@/types/token';

export const filterTokens = (tokens: TokenInfo[]) => {
  const tokenAddressesToFilter = [
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', //usdc
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', //bonk
    // Add more token addresses here if needed
  ];

  // filter all the tokens which contains tokenAccount of the array
  return tokens.filter((token) => {
    // if the tokenAccount is not in the array, return true
    return tokenAddressesToFilter.includes(token.mint);
  });
};
