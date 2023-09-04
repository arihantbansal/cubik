import { utils } from "@coral-xyz/anchor";

export const createMessage = (hash: string) => {
  try {
    const check = utils.sha256.hash(hash);

    const message = `🔶 Welcome to Cubik! 🔶\n
-----------------------------\n
🌱 Dive into a realm where every voice fuels projects, \n
breathing life into ideas with the power of community. 🌱 \n
session: ${check}\n`;

    const data = new TextEncoder().encode(message);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
