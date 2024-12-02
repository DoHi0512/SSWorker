import { FormListType } from "@/types/shared";

export const WORKER_FORM: FormListType[] = [
  {
    type: "input",
    name: "name",
    label: "이름",
    rules: { required: "이름은 필수 항목입니다." }
  },
  {
    type: "input",
    name: "register_number",
    label: "주민번호",
    rules: {
      required: "주민번호는 필수 항목입니다.",
      pattern: {
        value: /^\d{6}[-]?\d{7}$/,
        message: "유효한 주민번호를 입력해주세요."
      }
    }
  },
  {
    type: "input",
    name: "phone_number",
    label: "전화번호",
    rules: {
      required: "전화번호는 필수 항목입니다.",
      pattern: {
        value: /^(01[0-9]{1})([0-9]{3,4})([0-9]{4})$/,
        message: "유효한 전화번호를 입력해주세요."
      }
    }
  },
  {
    type: "input",
    name: "pay",
    label: "단가",
    rules: {
      required: "단가는 필수 항목입니다.",
      pattern: { value: /^[0-9]+$/, message: "숫자만 입력 가능합니다." }
    }
  },
  {
    type: "input",
    name: "address",
    label: "주소",
    rules: { required: "주소는 필수 항목입니다." }
  },
  {
    type: "dropdown",
    name: "bank",
    label: "은행",
    options: ["신한은행", "국민은행", "카카오뱅크"],
    rules: { required: "은행은 필수 항목입니다." }
  },
  {
    type: "input",
    name: "account_number",
    label: "계좌번호",
    rules: {
      required: "계좌번호는 필수 항목입니다.",
      pattern: { value: /^[0-9]+$/, message: "숫자만 입력 가능합니다." }
    }
  },
  {
    type: "input",
    name: "depositor",
    label: "예금주",
    rules: { required: "예금주는 필수 항목입니다." }
  }
];

export const PLACE_FORM: FormListType[] = [
  {
    type: "input",
    name: "name",
    size: "small",
    label: "현장명",
    rules: { required: "현장명은 필수 항목입니다." }
  }
];
