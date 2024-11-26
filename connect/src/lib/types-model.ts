import { MimeType } from '@pipium/model';

/** Input and output MIME types. */
export interface Types {
  /** Input MIME types. These are the types this model accepts as input. */
  inputs: MimeType[];

  /** Input MIME types. This is the type this model produces as output. */
  output: MimeType;
}
