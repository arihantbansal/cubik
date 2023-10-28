export const getMessage = async (nonce: string) => {
  try {
    const res = await fetch('/api/auth/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cubik-nonce': nonce,
      },
    });
    const data = await res.json();
    return data.hash;
  } catch (error) {
    console.log(error);
    return null;
  }
};
