import { ClipboardHandler, ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    clipboard: ClipboardHandler;
  }
}

export {};
