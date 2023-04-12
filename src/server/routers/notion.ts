import { z } from 'zod';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';
import { notion } from '../utils/notion';

// export notionRouter = router({
//     createTable: procedure
// })
