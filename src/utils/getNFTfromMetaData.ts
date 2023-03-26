export async function GetNftFromMetaData({
  NFTMetadataURIs,
}: {
  NFTMetadataURIs: string[];
}) {
  try {
    const promises = NFTMetadataURIs.map(
      async (item: string) => await fetch(item)
    );
    await Promise.all(promises);
    const nftsData = await Promise.all(promises);
    const nftsDataJson = await Promise.all(
      nftsData.map(async (item) => await item.json())
    );
    return nftsDataJson;
  } catch (e) {
    throw new Error();
  }
}
