// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ProjectsModel } from '@prisma/client';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const token = `${process.env.NEXT_PUBLIC_NOTION_TOKEN}` as string;

enum NotionConfig {
  API_URL = 'https://api.notion.com/v1',
  NOTION_VERSION = '2022-06-28',
}

const ProjectStatus: any = {
  REVIEW: 'under_review',
  VERIFIED: 'verification_successful',
  FAILED: 'verification_failed',
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
        title: [{ text: { content: data.name } }],
      },
      ...(data.status == undefined
        ? undefined
        : {
            'Project Status': {
              select: {
                name: ProjectStatus[data.status],
              },
            },
          }),

      ...(data.short_description == undefined
        ? undefined
        : {
            'Short Description': {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: data.short_description,
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
                  plain_text: data.short_description,
                  href: null,
                },
              ],
            },
          }),
      ...(data.twitter_handle == undefined
        ? undefined
        : {
            Twitter: {
              url: data.twitter_handle,
            },
          }),
      ...(data.github_link == undefined
        ? undefined
        : {
            Github: {
              url: data.github_link,
            },
          }),
      ...(data.discord_link == undefined
        ? undefined
        : {
            Discord: {
              url: data.discord_link,
            },
          }),
      ...(data.telegram_link == undefined
        ? undefined
        : {
            Telegram: {
              url: data.telegram_link,
            },
          }),
      ...(data.failedReason == undefined
        ? undefined
        : {
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
          }),
      ...(data.long_description == undefined
        ? undefined
        : {
            'Long Description': {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: data.long_description,
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
                  plain_text: data.long_description,
                  href: null,
                },
              ],
            },
          }),
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
    return res.send(null);
  }
}
