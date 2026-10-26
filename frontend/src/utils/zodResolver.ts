import type { Resolver, FieldValues, FieldErrors } from "react-hook-form";
import type { ZodType } from "zod";

export const customZodResolver =
  <T extends FieldValues>(schema: ZodType<T>): Resolver<T> =>
  async (values) => {
    const result = await schema.safeParseAsync(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors: Record<string, unknown> = {};

    for (const issue of result.error.issues) {
      if (issue.path.length === 0) {
        errors.root = {
          type: issue.code,
          message: issue.message,
        };
        continue;
      }

      let current = errors;

      for (let i = 0; i < issue.path.length - 1; i++) {
        const key = String(issue.path[i]);
        const nextKey = issue.path[i + 1];

        if (!current[key]) {
          current[key] = typeof nextKey === "number" ? [] : {};
        }

        current = current[key] as Record<string, unknown>;
      }

      const lastKey = String(issue.path[issue.path.length - 1]);
      current[lastKey] = {
        type: issue.code,
        message: issue.message,
      };
    }

    return {
      values: {},
      errors: errors as unknown as FieldErrors<T>,
    };
  };
