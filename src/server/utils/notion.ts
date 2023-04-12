import axios from 'axios';
import { NotionConfig } from '../enums/notion';
import { NotionTable } from '../enums/notion';
import { ProjectsModel } from '@prisma/client';

const token = `${process.env.NEXT_PUBLIC_NOTION_TOKEN}` as string;

export async function createTable() {
  const table = await axios.post(
    NotionConfig.API_URL + '/databases',
    NotionTable,
    {
      headers: {
        'Notion-Version': NotionConfig.NOTION_VERSION,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return table;
}

export async function addField(data: ProjectsModel) {
  // create the type of the field
  const field = {
    parent: { database_id: process.env.NEXT_PUBLIC_NOTION_PAGEID },
    properties: {
      'Project Name': {
        title: [
          {
            text: {
              content: data.name,
            },
          },
        ],
      },
      'Project Status': {
        select: {
          name: data.status,
        },
      },
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
      Twitter: {
        url: data.twitter_handle,
      },
      Github: { url: data.github_link },
      Discord: { url: data.discord_link },
      Telegram: { url: data.telegram_link },
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
    },
  };

  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const response = await axios.post(NotionConfig.API_URL + '/pages', field, {
    headers: {
      'Notion-Version': NotionConfig.NOTION_VERSION,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
