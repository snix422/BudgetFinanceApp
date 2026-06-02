export type BackendValidationError = {
  title?: string;
  errors: Record<string, string[]>;
};
