import Head from "next/head";
import config from "~/config/general.config";
import SeoPropsType from "~/types/seo";

const SEO = ({ title, description, image }: SeoPropsType) => {
  const domain = `https://${config.general.domain}/`;
  const absoluteImageUrl = image.startsWith("http")
    ? image
    : `${domain}${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={absoluteImageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={domain} />
      <meta property="og:site_name" content={config.general.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={description} />
      <meta name="twitter:site" content={config.general.twitterHandle} />
      <meta name="twitter:creator" content={config.general.twitterHandle} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
