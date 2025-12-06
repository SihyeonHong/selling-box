import { z } from "zod";

import { User } from "./user";

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email({ message: "올바른 이메일 형식을 입력해주세요" }),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  rememberMe: z.boolean().optional(),
});

// 회원가입 폼 스키마
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력해주세요")
      .min(2, "이름은 최소 2자 이상이어야 합니다")
      .max(20, "이름은 최대 20자까지 가능합니다")
      .regex(
        /^[a-zA-Z0-9_가-힣\s]+$/,
        "이름은 영문, 한글, 숫자, 언더스코어만 사용 가능합니다",
      ),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email({ message: "올바른 이메일 형식을 입력해주세요" }),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다",
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    termsAgreement: z
      .boolean()
      .refine((val) => val === true, "이용약관에 동의해주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 타입 추출
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// API 응답 타입
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token?: string;
  };
}

// 에러 타입
export interface AuthError {
  field?: string;
  message: string;
}
