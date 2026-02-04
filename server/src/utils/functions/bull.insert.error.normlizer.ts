import { WriteError } from 'mongodb';
export function normalizeWriteErrors(
  errors: WriteError | WriteError[],
): WriteError[] {
  return Array.isArray(errors) ? errors : [errors];
}
