interface TrackInfo {
  ip: string;
  country: string;
  userAgent: string;
  latitude: string;
  longitude: string;
}

export const getTrackInfo = async (): Promise<TrackInfo | null> => {
  try {
    const res = await fetch('https://cubik.so/api/track', {
      method: 'GET',
      cache: 'no-cache',
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
