import React, { useState } from 'react';
import './App.css';

const printMac = (path: string) => {
  let result = path;
  if (/^\\\\nas\\/i.test(result)) {
    result = result.replace(/^\\\\nas/i, '/Volumes');
  }
  return result.replace(/\\/g, '/');
};

const printWin = (path: string) => {
  let result = path;
  if (/^\/Volumes\//i.test(result)) {
    result = result.replace(/^\/Volumes/i, '//nas');
  }
  return result.replace(/\//g, '\\');
};

function IconButton({
  onClick,
  disabled,
  icon,
  bgColor,
  textColor,
}: {
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string; // e.g. "bg-blue-600"
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center rounded-md ${bgColor} ${textColor} hover:${bgColor.replace('600', '700')} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {icon}
    </button>
  );
}

function FilePathClipboard() {
  const [path, setPath] = useState<string>('');

  /* ---- Clipboard helpers ---- */
  const handleCopy = (formatter: (p: string) => string) => {
    if (!path.trim()) return;
    window.clipboard.writeText(formatter(path));
  };

  const handleCopyBoth = () => {
    if (!path.trim()) return;
    window.clipboard.writeText(`
${printMac(path)}

${printWin(path)}
`);
  };

  /* ---- Button component for consistency ---- */

  return (
    <div className="p-4 relative w-full  h-screen bg-lightEN dark:bg-slate-950">
      <input
        id="file-path"
        type="text"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="Hier Dateipfad eingeben"
        className="w-full p-2 mb-3 text-base rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-slate-50"
      />

      <div className="flex gap-10">
        {/* Apple */}
        <IconButton
          onClick={() => handleCopy(printMac)}
          disabled={!path.trim()}
          bgColor="bg-black dark:bg-lightEN"
          textColor="text-white dark:text-black"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" />
              <path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" />
            </svg>
          }
        />

        {/* Windows */}
        <IconButton
          onClick={() => handleCopy(printWin)}
          disabled={!path.trim()}
          bgColor="bg-enomic dark:bg-enomic"
          textColor="text-white dark:text-black"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M21 13v5c0 1.57 -1.248 2.832 -2.715 2.923l-.113 .003l-.042 .018a1 1 0 0 1 -.336 .056l-.118 -.008l-4.676 -.585v-7.407zm-10 0v7.157l-5.3 -.662c-1.514 -.151 -2.7 -1.383 -2.7 -2.895v-3.6zm0 -9.158v7.158h-8v-3.6c0 -1.454 1.096 -2.648 2.505 -2.87zm10 2.058v5.1h-8v-7.409l4.717 -.589c1.759 -.145 3.283 1.189 3.283 2.898" />
            </svg>
          }
        />

        {/* Both */}
        <IconButton
          onClick={handleCopyBoth}
          disabled={!path.trim()}
          bgColor="bg-cream dark:bg-cream"
          textColor="text-white dark:text-black"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-4.333 4a1 1 0 0 0 -1 1v2h-2a1 1 0 0 0 -.993 .883l-.007 .117a1 1 0 0 0 1 1h2v2a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-2h2a1 1 0 0 0 .993 -.883l.007 -.117a1 1 0 0 0 -1 -1h-2v-2a1 1 0 0 0 -.883 -.993zm1 -8c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

export default function App() {
  return <FilePathClipboard />;
}
