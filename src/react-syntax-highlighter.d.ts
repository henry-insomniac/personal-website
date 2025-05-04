declare module "react-syntax-highlighter" {
  import { CSSProperties, ReactNode } from "react";
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: ReactNode;
    customStyle?: CSSProperties;
    lineProps?: any;
    className?: string;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: CSSProperties;
    wrapLines?: boolean;
    [key: string]: any;
  }

  export const Prism: React.ComponentType<SyntaxHighlighterProps>;
  export const Light: React.ComponentType<SyntaxHighlighterProps>;
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism" {
  export const atomDark: any;
  export const vscDarkPlus: any;
  export const dracula: any;
  export const nord: any;
  export const duotoneDark: any;
  export const materialDark: any;
  export const okaidia: any;
  export const a11yDark: any;
  export const nightOwl: any;
}
