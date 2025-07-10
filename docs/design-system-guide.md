# 디자인 시스템 가이드

이 프로젝트는 Next.js 팀이 권장하는 시맨틱 변수 기반 디자인 시스템을 사용합니다.

## 핵심 철학

- **의미 기반 색상**: `text-white` 대신 `text-foreground` 사용
- **중앙 집중 관리**: 모든 색상을 CSS 변수로 관리
- **테마 일관성**: 라이트/다크 모드 자동 대응

## 색상

### 색상 추가 시

1. 정의: 이 색상의 역할이 무엇인지 정의하고, 그것을 나타내는 변수 이름 정하기.
2. CSS 변수 정의: `:root`와 `:root.dark`에 추가
3. Tailwind 설정: `@theme inline`에 추가

#### 주의사항

- 색상 자체를 나타내는 이름 사용 금지. 의미 기반 명명.
- 테마 전환 시 모든 색상이 자동으로 적용되어야 함
- 색상 선택 시 접근성 고려 (충분한 대비)
- 일관성 유지를 위해 기존 색상 최대한 활용

### 색상 분류

#### 기본 색상

- `background` / `foreground`: 기본 배경/텍스트
- `muted` / `muted-foreground`: 보조 배경/텍스트

#### 의미 색상

- `primary` / `primary-foreground`: 주요 액션
- `secondary` / `secondary-foreground`: 보조 액션
- `destructive` / `destructive-foreground`: 위험한 액션

#### 구조 색상

- `border`: 테두리
- `input`: 입력 필드 배경
- `ring`: 포커스 링

#### 상태 색상

- `success` / `success-foreground`: 성공 상태
- `warning` / `warning-foreground`: 경고 상태
- `error` / `error-foreground`: 오류 상태

#### 브랜드 색상

- `accent` / `accent-foreground`: 브랜드 강조색
- (추가 예정)

## 텍스트

- 기본: `text-foreground`
- 보조: `text-muted-foreground`
- 브랜드: `text-primary`

## 배경

- 기본: `bg-background`
- 강조: `bg-muted`
- 액션: `bg-primary`

## 테두리

- 기본: `border-border`
- 강조: `border-primary`
- 포커스: `focus:ring-ring`

## 금지사항

- 인라인 스타일 금지
- 절대 색상 사용 금지: `text-white`❌ / `text-foreground`✅
