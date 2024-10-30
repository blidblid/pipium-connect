import { z } from 'zod';
import { USER_ID_SCHEMA } from './common-model';

export const USER_BODY_SCHEMA = z.object({
  id: USER_ID_SCHEMA,
  lastVisitedPipeId: z
    .string()
    .optional()
    .describe('ID of the last visited pipe.'),
});

export const USER_SCHEMA = USER_BODY_SCHEMA;

export type UserBody = z.infer<typeof USER_BODY_SCHEMA>;
export type User = z.infer<typeof USER_SCHEMA>;
