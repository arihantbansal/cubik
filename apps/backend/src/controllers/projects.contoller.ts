import {} from '@cubik/comman-types';
import { dbInit } from '../service/pscale';
import { Request, Response } from 'express';

export const projectExplorer = async (req: Request, res: Response) => {
  try {
    const pool = dbInit();
    const [row] = await pool.promise().query('SELECT * FROM ProjectsModel');

    return res.status(200).json({ row });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error });
  }
};
