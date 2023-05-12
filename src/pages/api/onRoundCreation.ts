import { ProjectsModel } from '@prisma/client';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NotionConfig } from '~/server/enums/notion';

const token = `${process.env.NEXT_PUBLIC_NOTION_TOKEN}` as string;
// create subpage in existing page
export async function createPage(req: NextApiRequest, res: NextApiResponse) {
  const {
    page_title,
  }: {
    page_title: string;
  } = req.body;

  const page = {
    parent: {
      type: 'page_id',
      page_id: process.env.NEXT_PUBLIC_NOTION_PAGEID,
    },
    properties: {
      title: [
        {
          type: 'text',
          text: {
            content: page_title,
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
          plain_text: page_title,
          href: null,
        },
      ],
    },
  };

  try {
    const response = await axios.post(NotionConfig.API_URL + '/pages', page, {
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
// create database in existing page
export async function createDatabase(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: { data: ProjectsModel } = req.body;

  // input the title we wanna have
  const record = await createNotionSchema('Title');
  try {
    const response = await axios.post(
      NotionConfig.API_URL + '/databases',
      record,
      {
        headers: {
          'Notion-Version': NotionConfig.NOTION_VERSION,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // get the id from response and map it with the title if want to find this db
    return res.send(JSON.stringify(response));
  } catch (error) {
    return res.send(null);
  }
}

// creates schema of database
async function createNotionSchema(title: string) {
  // https://developers.notion.com/reference/property-value-object
  const record = {
    parent: {
      type: 'page_id',
      page_id: process.env.NEXT_PUBLIC_NOTION_PAGEID,
    },
    title: [
      {
        type: 'text',
        text: {
          content: title,
          link: null,
        },
      },
    ],
    properties: {
      'Project Name': {
        title: {},
      },
      'Created Date': {
        created_time: {},
      },
      'Project Status': {
        select: {
          options: [
            {
              name: 'verification_failed',
              color: 'red',
            },
            {
              name: 'verification_successful',
              color: 'blue',
            },
            {
              name: 'under_review ',
              color: 'yellow',
            },
          ],
        },
      },
      'Short Description': {
        rich_text: {},
      },
      Twitter: {
        url: {},
      },
      Github: {
        url: {},
      },
      Discord: {
        url: {},
      },
      Telegram: {
        url: {},
      },
      Comments: {
        rich_text: {},
      },
      'Failed Reason': {
        rich_text: {},
      },
      'Long Description': {
        rich_text: {},
      },
    },
  };

  return record;
}
