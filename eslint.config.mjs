import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// 1. Node.js 모듈에서 현재 파일 경로(__filename)와 디렉터리 경로(__dirname)를 얻음
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 2. FlatCompat 생성: Next.js ESLint 규칙을 Flat Config 형태로 변환하여 사용 가능하게 함
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

import reactHooks from "eslint-plugin-react-hooks"; // React Hooks 규칙 플러그인
import prettier from "eslint-config-prettier"; // Prettier와 ESLint 충돌 방지용 설정
import unusedImports from "eslint-plugin-unused-imports"; // 사용하지 않는 import/변수 검사 플러그인

const eslintConfig = [
  // 4. Next.js 및 TypeScript 관련 기본 ESLint 설정 확장 (core web vitals, 타입스크립트 검사 포함)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 5. 내 커스텀 플러그인 설정
  {
    plugins: {
      "react-hooks": reactHooks, // React Hooks 검사 플러그인 등록
      "unused-imports": unusedImports, // 사용 안 하는 import/변수 검사 플러그인 등록
    },
    rules: {
      // 6. React Hooks 관련 주요 룰 설정
      "react-hooks/rules-of-hooks": "error", // Hooks는 함수 컴포넌트 혹은 커스텀 훅 내에서만 호출 가능하도록 강제
      "react-hooks/exhaustive-deps": "warn", // useEffect 등의 의존성 배열 누락 감지

      // 7. 사용하지 않는 import/변수 관련 룰
      "unused-imports/no-unused-imports": "warn", // 사용하지 않는 import 자동 경고
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all", // 모든 변수 검사
          varsIgnorePattern: "^_", // 이름이 _로 시작하는 변수는 무시 (의도적 미사용 표시)
          args: "after-used", // 함수 매개변수 중 사용된 이후에 쓰이지 않는 것만 검사
          argsIgnorePattern: "^_", // 매개변수도 _로 시작하면 무시
        },
      ],
    },
  },
  // 8. Prettier 설정 적용: ESLint와 포맷팅 충돌하는 룰 비활성화
  {
    name: "prettier",
    rules: prettier.rules,
  },
];

export default eslintConfig;
