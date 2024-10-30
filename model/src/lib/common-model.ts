import { z } from 'zod';

export const USER_ID_SCHEMA = z.string().describe('User ID.');
export const PIPE_ID_SCHEMA = z.string().describe('Pipe ID.');
export const LAYER_ID_SCHEMA = z.string().describe('Layer ID.');
export const MODEL_ID_SCHEMA = z.string().describe('Model ID.');
export const RESULT_ID_SCHEMA = z.string().describe('Result ID.');
export const FOLDER_ID_SCHEMA = z.string().describe('Folder ID.');
export const INPUT_ID_SCHEMA = z.string().describe('Input ID.');
export const API_KEY_ID_SCHEMA = z.string().describe('API key ID.');
export const RUN_ID_SCHEMA = z.string().describe('Run ID.');
