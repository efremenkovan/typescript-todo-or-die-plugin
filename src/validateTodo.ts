import { Validation, ValidateMetaData, Conditions } from "./types";
import { after_date } from "./after_date";
import { when } from "./when";
import { startsWithKeyword } from "./utils";

const conditions: Conditions = {
  after_date,
  when,
};

export function validateTodo(
  todo: string,
  meta: ValidateMetaData,
  additionalKeywords?: string[] | undefined
): Validation {
  let keywords: string[] = ["TODO", "FIXME"];

  if (additionalKeywords) {
    keywords = [...keywords, ...additionalKeywords];
  }

  if (startsWithKeyword(todo, keywords)) {
    const condition = todo.substring(
      todo.indexOf("::") + 2,
      todo.lastIndexOf(":")
    );

    if (condition.startsWith("after_date")) {
      const param = todo.substring(
        todo.indexOf("(") + 2,
        todo.lastIndexOf(")")
      );
      return conditions.after_date(param, meta.options);
    }

    if (condition.startsWith("when")) {
      const param = todo.substring(
        todo.indexOf("(") + 1,
        todo.lastIndexOf(")")
      );

      return conditions.when(param, {
        pjson: meta.packageJson,
        options: meta.options?.when,
      });
    }

    return { error: false };
  }
  return { error: false };
}
