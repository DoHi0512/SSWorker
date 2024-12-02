export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export interface FormListType {
  type: "input" | "dropdown" | "datepicker";
  label: string;
  options?: string[];
  name: string;
  size?: "small" | "medium";
  rules: {
    required: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}
