/** Global hover preview: any notation chip can show a position in a floating mini board. */
export interface PreviewData {
  fen: string;
  arrows?: [string, string][];
  square?: string;
  orientation?: 'white' | 'black';
  caption?: string;
}

export const preview = $state<{ data: PreviewData | null; rect: DOMRect | null }>({ data: null, rect: null });

let hideTimer: ReturnType<typeof setTimeout> | undefined;

export function showPreview(el: Element, data: PreviewData) {
  clearTimeout(hideTimer);
  preview.data = data;
  preview.rect = el.getBoundingClientRect();
}

export function hidePreview() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    preview.data = null;
    preview.rect = null;
  }, 60);
}
