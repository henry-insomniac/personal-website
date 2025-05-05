declare module "react-syntax-highlighter" {
  import { CSSProperties, ReactNode } from "react";
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: Record<string, unknown> | CSSProperties;
    children?: ReactNode;
    customStyle?: CSSProperties;
    lineProps?: Record<string, unknown>;
    className?: string;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: CSSProperties;
    wrapLines?: boolean;
    [key: string]: unknown;
  }

  export const Prism: React.ComponentType<SyntaxHighlighterProps>;
  export const Light: React.ComponentType<SyntaxHighlighterProps>;
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism" {
  type SyntaxHighlighterStyle = Record<string, unknown>;
  export const atomDark: SyntaxHighlighterStyle;
  export const vscDarkPlus: SyntaxHighlighterStyle;
  export const dracula: SyntaxHighlighterStyle;
  export const nord: SyntaxHighlighterStyle;
  export const duotoneDark: SyntaxHighlighterStyle;
  export const materialDark: SyntaxHighlighterStyle;
  export const okaidia: SyntaxHighlighterStyle;
  export const a11yDark: SyntaxHighlighterStyle;
  export const nightOwl: SyntaxHighlighterStyle;
}
