import axios from 'axios';
import { NotionConfig } from '../enums/notion';
import { NotionTable } from '../enums/notion';
import * as dotenv from 'dotenv';
dotenv.config();

const token = `${process.env.NOTION_TOKEN}` as string;

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

export async function addField(data: any) {
  const response = await axios.post(NotionConfig.API_URL + '/pages', data, {
    headers: {
      'Notion-Version': NotionConfig.NOTION_VERSION,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
