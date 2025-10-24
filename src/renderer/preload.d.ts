import { ClipboardHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    clipboard: ClipboardHandler;
  }
}

export {};
