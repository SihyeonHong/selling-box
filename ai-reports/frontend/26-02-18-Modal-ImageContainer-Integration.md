# 모달창과 ImageContainer 연결 구현 계획

## 1. 배경

`bulk-product-register.tsx`의 139번 라인에 아래와 같은 주석이 남아 있습니다.

```ts
const handleEditImages = () => {
  // 추후 모달창과 ImageContainer 연결 예정
  console.log("사진 편집 기능은 추후 구현 예정");
};
```

"사진 편집하기" 버튼을 누르면 모달창이 열리고, 그 모달 안에 `ImageContainer` 컴포넌트를 렌더링해야 합니다.

## 2. shadcn 컴포넌트 선택

현재 프로젝트의 `src/components/common/shadcn` 디렉토리에는 "Sheet"가 설치되어 있으나 "Dialog"는 설치되어 있지 않은 상태입니다. 후보 3가지를 비교한 결과는 아래와 같습니다.

1. Dialog: 화면 중앙에 오버레이되어 표시되는 전통적인 모달 방식. 사용자의 "집중"을 유도하며, 메인 콘텐츠와의 상호작용을 차단합니다. Radix UI Dialog 기반으로 접근성(포커스 트랩, 키보드 내비게이션, 스크린 리더)이 보장됩니다.
2. Sheet: 화면 한쪽 가장자리에서 슬라이드되어 나타나는 사이드 패널. 본 프로젝트에서는 이미 사이드바(sidebar) 용도로 사용 중입니다. Radix UI Dialog를 extend합니다.
3. Drawer: 주로 모바일 환경에서 하단이나 측면에서 슬라이드되어 나타나는 패널. Vaul 라이브러리 기반으로 물리 기반 애니메이션을 제공합니다.

### 2.1. 선택: Dialog

- "선택 근거": ImageContainer는 이미지 위에 가이드라인을 드래그하여 배치하는 등의 "정밀한 상호작용"을 요구하는 에디터입니다. 사용자가 편집 작업에 "집중"해야 하므로, 화면 중앙에 크게 표시되어 배경과의 상호작용을 차단하는 Dialog가 가장 적합합니다.
- Sheet는 보조 콘텐츠를 위한 사이드 패널에 적합하며, Drawer는 모바일의 간단한 액션에 적합합니다. 이미지 편집처럼 넓은 작업 공간과 집중이 필요한 경우에는 "Dialog"가 최선의 선택입니다.
- `@radix-ui/react-dialog`는 `package.json`에 이미 설치되어 있어 추가 의존성 설치가 필요 없습니다.

### 2.2. 설치 명령어

아래 명령어를 실행하면 `src/components/common/shadcn/dialog.tsx` 파일이 생성됩니다(components.json의 `ui` alias에 따라).

```
npx shadcn@latest add dialog
```

## 3. 구현 계획

### 3.1. DialogTrigger vs Controlled(open/onOpenChange) 비교

현재 "사진 편집하기" 버튼은 아래와 같은 구조를 가지고 있습니다.

```tsx
<button
  onClick={handleEditImages}
  disabled={selectedImageIds.size === 0}
  className="flex cursor-pointer items-center gap-2 ..."
>
  <Edit size={16} />
  사진 편집하기
</button>
```

두 가지 방식을 비교합니다.

#### 방식 A: DialogTrigger + asChild

```tsx
<Dialog>
  <DialogTrigger asChild>
    <button disabled={selectedImageIds.size === 0} className="...">
      <Edit size={16} />
      사진 편집하기
    </button>
  </DialogTrigger>
  <DialogContent>
    <ImageContainer />
  </DialogContent>
</Dialog>
```

- "장점": `useState`가 필요 없어 코드가 간결합니다. Dialog가 열림/닫힘을 내부적으로 관리합니다.
- "레이아웃 영향 없음": `Dialog`는 React Context Provider로 DOM 요소를 생성하지 않고, `DialogTrigger asChild`도 자식 요소를 그대로 렌더링합니다. 따라서 버튼, 버튼, Dialog(사진 편집하기 버튼 + DialogContent), 버튼 구조가 되어도 실제 렌더링되는 DOM은 버튼 4개가 동일한 flex 컨테이너에 나란히 배치됩니다.
- "단점": 3.2절에서 채택한 "닫힘 제한 + confirm" 동작을 구현하기 어렵습니다. DialogTrigger의 Uncontrolled 방식에서는 `onOpenChange`를 통한 닫힘 가로채기가 불가능하므로, `showCloseButton={false}`나 `onEscapeKeyDown`, `onInteractOutside` 등의 닫힘 제어 props를 사용하려면 Controlled 방식이 "필수적"입니다.

#### 방식 B: Controlled (open/onOpenChange)

```tsx
// state
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// 기존 버튼은 그대로 유지
<button onClick={() => setIsEditModalOpen(true)} disabled={...}>
  사진 편집하기
</button>

// Dialog는 return문 최하단에 독립적으로 배치
<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
  <DialogContent>
    <ImageContainer />
  </DialogContent>
</Dialog>
```

- "장점": 기존 버튼 그룹의 JSX 구조를 "전혀 변경하지 않아도" 됩니다. Dialog를 JSX트리 내 원하는 위치에 독립적으로 배치할 수 있습니다. 또한, 나중에 모달의 열림/닫힘을 프로그래밍적으로 제어(예: 편집 완료 시 자동 닫힘, 확인 다이얼로그와의 연동 등)할 수 있어 확장성이 좋습니다.
- "단점": `useState`가 하나 추가됩니다.

#### 결론: 방식 B (Controlled) 채택

방식 A(DialogTrigger)를 사용해도 레이아웃이 깨지지 않고 코드 구조도 복잡하지 않습니다. 그러나 3.2절에서 채택한 "닫힘 제한 + confirm"(옵션 B)을 구현하려면 `open`/`onOpenChange`를 통한 닫힘 제어가 "필수적"이므로, 방식 B(Controlled)를 채택합니다. 즉, 3.2의 옵션 B 결정이 3.1의 방식 B 채택을 강제합니다.

### 3.2. 모달 닫힘 동작 비교

이미지 편집 중인 상태에서 모달이 닫히는 경우를 어떻게 처리할지 2가지 옵션을 비교합니다.

#### 옵션 A: ESC/오버레이 클릭 닫힘 허용 + 편집 상태 유지

ESC 키, 오버레이 클릭, X 버튼 등 "모든 닫힘 동작을 허용"하되, 모달을 다시 열면 이전 편집 상태가 그대로 남아 있도록 합니다.

- "구현 방식": ImageContainer를 조건부 렌더링(모달이 닫히면 unmount)하지 않고, 모달이 닫혀도 ImageContainer 인스턴스를 유지해야 합니다. 이를 위해 ImageContainer의 상태(imageInfo, lines 등)를 부모 컴포넌트(`BulkProductRegister`)로 끌어올리거나(lift state up), 또는 `useImageEditor` 훅의 상태를 외부 store(예: zustand)로 관리해야 합니다.
- "장점": 사용자가 모달을 자유롭게 열고 닫을 수 있어 UX가 유연합니다. 메인 화면의 이미지 풀을 보면서 편집 작업을 번갈아가며 할 수 있습니다.
- "단점": 상태 끌어올리기 또는 외부 store 도입으로 "구현 복잡도가 높습니다." `useImageEditor` 훅 내부의 상태(`imageInfo`, `verticalLines`, `horizontalLines`, `isDragging` 등)를 모두 부모로 옮기거나 외부에서 관리해야 합니다. 현재 `ImageContainer`와 `useImageEditor`의 구조를 상당 부분 리팩터링해야 합니다.

#### 옵션 B: 닫힘 제한 + 확인 다이얼로그

ESC 키 닫힘과 오버레이 클릭 닫힘을 "차단"합니다. 닫힘은 "오직 X 버튼(또는 별도의 완료/취소 버튼)"을 통해서만 가능하며, 클릭 시 "편집 중인 내용이 모두 사라집니다. 닫으시겠습니까?" 확인을 받습니다.

- "구현 방식": `DialogContent`에 `onInteractOutside={(e) => e.preventDefault()}`와 `onEscapeKeyDown={(e) => e.preventDefault()}`를 추가하여 기본 닫힘 동작을 차단합니다. `DialogContent`의 `showCloseButton={false}` prop을 사용하여 기본 X 버튼을 숨기고, 커스텀 닫기 버튼을 직접 만들어 confirm 로직을 연결합니다.
- "장점": 편집 내용이 실수로 유실되는 것을 "완전히 방지"합니다. 구현이 상대적으로 단순합니다. 별도의 상태 관리 리팩터링이 필요 없습니다.
- "단점": 모달을 닫으려면 반드시 명시적 액션을 해야 하므로, 자유로운 전환이 어렵습니다.

#### 결론: 옵션 B (닫힘 제한 + 확인 다이얼로그) 채택

"근거": 옵션 A는 이상적이지만, 현재 `useImageEditor` 훅의 상태 구조를 대폭 변경해야 하므로 본 작업의 범위를 초과합니다. 옵션 B는 `dialog.tsx`에 이미 구현되어 있는 `showCloseButton` prop을 활용하여 최소한의 변경으로 안전한 UX를 제공할 수 있습니다. 향후 편집 상태 유지가 필요해지면 옵션 A로 전환할 수 있습니다.

## 4. 기술적 고려 사항

1. "DialogContent 크기": `max-w-4xl`을 사용하여 이미지 편집에 충분한 너비를 확보합니다. `dialog.tsx`의 기본값은 `sm:max-w-lg`이므로, className으로 override합니다. 높이는 `max-h-[90vh]`와 `overflow-y-auto`로 뷰포트 내에서 스크롤 가능하도록 합니다.
2. "showCloseButton={false}": `dialog.tsx`의 `DialogContent`에 내장된 기본 X 버튼은 `DialogPrimitive.Close`로 구현되어 있어, 클릭 시 즉시 모달이 닫힙니다. 이를 비활성화하고 커스텀 닫기 버튼으로 대체하여 confirm 로직을 삽입합니다.
3. "접근성": `DialogTitle`을 지정하여 스크린 리더가 모달의 목적을 인식할 수 있도록 합니다. ESC/오버레이 닫힘은 차단되지만, 커스텀 닫기 버튼이 존재하므로 접근성 기본 요건은 충족됩니다.
4. "ImageContainer 내 이벤트": ImageContainer는 `document.addEventListener`로 마우스/터치 이벤트를 등록합니다. Dialog 내부에서도 정상 작동할 것으로 예상되나, 드래그 동작이 Dialog의 `onInteractOutside` 차단 로직과 충돌하지 않는지 확인이 필요합니다.

## 5. 검증 계획

### 5.1. 빌드 검증

```
npm run build
```

빌드가 에러 없이 완료되는지 확인합니다.

### 5.2. 수동 검증

1. `npm run dev`로 개발 서버를 실행합니다.
2. `/{locale}/{userId}/mypage/new-product` 페이지로 이동합니다.
3. 이전에 page.tsx에서 직접 노출되던 ImageContainer가 더 이상 보이지 않는지 확인합니다.
4. "이미지 풀" 영역에 이미지를 업로드합니다.
5. 업로드된 이미지를 1개 이상 선택(체크)합니다.
6. "사진 편집하기" 버튼을 클릭합니다.
7. 모달이 화면 중앙에 표시되는지 확인합니다.
8. 모달 안에 ImageContainer가 정상적으로 렌더링되는지 확인합니다.
9. ImageContainer에서 이미지를 불러온 뒤, 가이드라인 드래그가 모달 내에서 정상 작동하는지 확인합니다.
10. ESC 키를 눌러도 모달이 닫히지 "않는" 것을 확인합니다.
11. 오버레이(모달 바깥 어두운 영역)를 클릭해도 모달이 닫히지 "않는" 것을 확인합니다.
12. X 버튼을 클릭하면 "편집 중인 내용이 모두 사라집니다." 확인 다이얼로그가 표시되는지 확인합니다.
13. 확인 다이얼로그에서 "취소"를 누르면 모달이 유지되는지 확인합니다.
14. 확인 다이얼로그에서 "확인"을 누르면 모달이 닫히는지 확인합니다.
