// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, clipboard } from 'electron';

const clipboardHandler = {
  writeText: (text: string) => clipboard.writeText(text),
};

console.log('[preload] running – exposing clipboard');

contextBridge.exposeInMainWorld('clipboard', clipboardHandler);

export type ClipboardHandler = typeof clipboardHandler;
