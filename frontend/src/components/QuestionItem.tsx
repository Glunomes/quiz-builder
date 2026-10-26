import { useWatch, useFieldArray, useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import type { CreateQuizFormData, QuestionFormData } from "../schemas/quizFormSchema";
import {
  DEFAULT_BOOLEAN_QUESTION,
  DEFAULT_INPUT_QUESTION,
  DEFAULT_CHECKBOX_QUESTION,
} from "../schemas/quizFormSchema";
import styles from "../pages/CreateQuizPage.module.css";

interface QuestionItemProps {
  index: number;
  onRemove: () => void;
}

export const QuestionItem = ({ index, onRemove }: QuestionItemProps) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateQuizFormData>();

  const currentType = useWatch({
    control,
    name: `questions.${index}.type`,
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.options` as never,
  });

  const handleTypeChange = (newType: QuestionFormData["type"]) => {
    if (newType === "BOOLEAN") {
      setValue(`questions.${index}`, { ...DEFAULT_BOOLEAN_QUESTION, text: "", order: index });
    } else if (newType === "INPUT") {
      setValue(`questions.${index}`, { ...DEFAULT_INPUT_QUESTION, text: "", order: index });
    } else if (newType === "CHECKBOX") {
      setValue(`questions.${index}`, { ...DEFAULT_CHECKBOX_QUESTION, text: "", order: index });
    }
  };

  const questionError = errors.questions?.[index];

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionCardHeader}>
        <span className={styles.questionIndex}>Question #{index + 1}</span>
        <button
          type="button"
          onClick={onRemove}
          className={styles.deleteBtn}
          title="Delete question"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Type</label>
        <select
          value={currentType}
          onChange={(e) => handleTypeChange(e.target.value as QuestionFormData["type"])}
          className={styles.select}
        >
          <option value="BOOLEAN">True / False</option>
          <option value="INPUT">Text Input</option>
          <option value="CHECKBOX">Checkbox (Multiple options)</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Question text</label>
        <input
          {...register(`questions.${index}.text`)}
          className={styles.input}
          placeholder="Enter question text..."
        />
        {questionError?.text && <span className={styles.error}>{questionError.text.message}</span>}
      </div>

      {currentType === "BOOLEAN" && (
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Correct answer</label>
          <select
            {...register(`questions.${index}.booleanAnswer` as never, {
              setValueAs: (v) => v === "true",
            })}
            className={styles.select}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      )}

      {currentType === "INPUT" && (
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Correct text answer</label>
          <input
            {...register(`questions.${index}.textAnswer` as never)}
            className={styles.input}
            placeholder="Expected answer..."
          />
          {questionError && "textAnswer" in questionError && (
            <span className={styles.error}>
              {(questionError as { textAnswer?: { message?: string } }).textAnswer?.message}
            </span>
          )}
        </div>
      )}

      {currentType === "CHECKBOX" && (
        <div className={styles.optionsContainer}>
          <label className={styles.label}>Options (select correct ones)</label>

          {optionFields.map((optField, optIndex) => {
            const optErrors = (
              questionError as { options?: Array<{ text?: { message?: string } }> }
            )?.options?.[optIndex];

            return (
              <div key={optField.id} className={styles.optionRow}>
                <input
                  type="checkbox"
                  {...register(`questions.${index}.options.${optIndex}.isCorrect` as never)}
                  className={styles.checkbox}
                />
                <input
                  {...register(`questions.${index}.options.${optIndex}.text` as never)}
                  className={styles.input}
                  placeholder={`Option ${optIndex + 1}`}
                  style={{ flex: 1 }}
                />
                {optionFields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(optIndex)}
                    className={styles.deleteBtn}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                {optErrors?.text && <span className={styles.error}>{optErrors.text.message}</span>}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => appendOption({ text: "", isCorrect: false })}
            className={styles.addBtn}
          >
            + Add Option
          </button>

          {questionError &&
            "options" in questionError &&
            typeof (questionError as { options?: { message?: string } }).options?.message ===
              "string" && (
              <span className={styles.error}>
                {(questionError as { options: { message: string } }).options.message}
              </span>
            )}
        </div>
      )}
    </div>
  );
};
