import { config } from 'dotenv';

import { generateSlug } from './src/data-move/generate_slug';

console.log('Helper Script Started');

config();

generateSlug();
