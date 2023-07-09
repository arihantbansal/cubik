import { ProjectsModel } from 'database';
import axios from 'axios';
import { env } from '~/env.mjs';
import { NotionConfig, NotionTable, ProjectStatus } from '../enums/notion';
const token = `${env.NEXT_PUBLIC_NOTION_TOKEN}` as string;

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
  const record = await createNotionPayload(data);
  const response = await axios.post(NotionConfig.API_URL + '/pages', record, {
    headers: {
      'Notion-Version': NotionConfig.NOTION_VERSION,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

async function createNotionPayload(data: ProjectsModel) {
  // https://developers.notion.com/reference/property-value-object
  const record = {
    parent: {
      database_id: env.NEXT_PUBLIC_NOTION_DATABASEID,
    },
    properties: {
      'Project Name': {
        title: [{ text: { content: data.name } }],
      },
      'Project Status': {
        select: {
          name: ProjectStatus[data.status as any],
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
      Github: {
        url: data.github_link,
      },
      Discord: {
        url: data.discord_link,
      },
      Telegram: {
        url: data.telegram_link,
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
      'Created Date': {
        date: {
          start: new Date(),
        },
      },
    },
  };

  return record;
}
