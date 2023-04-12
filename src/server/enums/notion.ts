import * as dotenv from 'dotenv';
dotenv.config();

export enum NotionConfig {
  API_URL = 'https://api.notion.com/v1',
  NOTION_VERSION = '2022-06-28',
}

export const NotionTable = {
  parent: {
    type: 'page_id',
    page_id: process.env.NOTION_PAGEID,
  },
  title: [
    {
      type: 'text',
      text: {
        content: 'Title of Database',
        link: null,
      },
    },
  ],
  properties: {
    'Grant Name': {
      title: {},
    },
    'Created Date': {
      created_time: {},
    },
    'Platform Status': {
      select: {
        options: [
          {
            name: 'NEEDS REVIEW',
            color: 'gray',
          },
          {
            name: 'APPROVED',
            color: 'green',
          },
          {
            name: 'DENIED',
            color: 'red',
          },
        ],
      },
    },
    'Requested Rounds': {
      rich_text: {},
    },
    'Approved Rounds': {
      rich_text: {},
    },
    'Denied Rounds': {
      rich_text: {},
    },
    'Eligibilty Tag Reasoning': {
      rich_text: {},
    },
    Comments: {
      rich_text: {},
    },
  },
};
