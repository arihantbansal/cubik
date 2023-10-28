import { config } from 'dotenv';

import { createComponentNames } from './src/color/component';
import { generateSemantic } from './src/color/semantic';

console.log('Helper Script Started');

config();

createComponentNames();
