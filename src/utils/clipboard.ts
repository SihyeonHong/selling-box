/**
 * 클립보드에 텍스트를 복사하는 함수
 * 현대적 방식(navigator.clipboard)과 구형 방식(document.execCommand)을 모두 지원
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // 현대적 방식 시도 (HTTPS + 최신 브라우저)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 구형 방식 폴백
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      return successful;
    }
  } catch (error) {
    console.error("클립보드 복사 실패:", error);
    return false;
  }
};
