/** Audio widget configuration. */
export interface AudioWidgetConfig {
  /** Whether audio should autoplay. */
  autoplay: boolean;
}

/** Form widget configuration. */
export interface FormWidgetConfig {
  /** JSON schema that generates a form. */
  schema: Record<string, unknown>;
}

/** UI component configurations. */
export interface WidgetConfig {
  /** Audio widget configuration. */
  audio?: AudioWidgetConfig;

  /** Form widget configuration. */
  form?: FormWidgetConfig;
}
