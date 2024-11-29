export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export interface FormListType {
  type: "input" | "dropdown";
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
