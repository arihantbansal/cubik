// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '@cubik/database';
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;
//   try {
//     const result = await prisma.projectsModel.findUnique({
//       where: {
//         id: id as string,
//       },
//     });
//     return res.status(200).json(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json(null);
//   }
// }
export {};
