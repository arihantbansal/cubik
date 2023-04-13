// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ProjectsModel } from '@prisma/client';

const token = `${process.env.NEXT_PUBLIC_NOTION_TOKEN}` as string;

enum NotionConfig {
  API_URL = 'https://api.notion.com/v1',
  NOTION_VERSION = '2022-06-28',
}

const ProjectStatus: any = {
  review: 'under_review',
  verified: 'verification_successful',
  failed: 'verification_failed',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: { data: ProjectsModel } = req.body;

  const record = {
    parent: {
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASEID,
    },
    properties: {
      'Project Name': {
        title: [{ text: { content: data.name ?? null } }],
      },
      'Project Status': {
        select: {
          name: ProjectStatus[data.status] ?? null,
        },
      },
      'Short Description': {
        rich_text: [
          {
            type: 'text',
            text: {
              content: data.short_description ?? null,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: data.short_description ?? null,
            href: null,
          },
        ],
      },
      Twitter: {
        url: data.twitter_handle ?? null,
      },
      Github: {
        url: data.github_link ?? null,
      },
      Discord: {
        url: data.discord_link ?? null,
      },
      Telegram: {
        url: data.telegram_link ?? null,
      },
      'Failed Reason': {
        rich_text: [
          {
            type: 'text',
            text: {
              content: data.failedReason,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: data.failedReason,
            href: null,
          },
        ],
      },
      'Long Description': {
        rich_text: [
          {
            type: 'text',
            text: {
              content: data.long_description ?? null,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: data.long_description ?? null,
            href: null,
          },
        ],
      },
      'Created Date': {
        date: {
          start: new Date(),
        },
      },
    },
  };
  try {
    const response = await axios.post(NotionConfig.API_URL + '/pages', record, {
      headers: {
        'Notion-Version': NotionConfig.NOTION_VERSION,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.send(JSON.stringify(response));
  } catch (error) {
    console.log(error);

    return res.send(null);
  }
}
