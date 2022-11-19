import { ReactElement, RefObject } from 'react';

export type HasClassname = { className?: string };
export type HasStyle = { style?: CSSStyleSheet };
export type HasRef = { ref?: RefObject<HTMLElement> };

export type PropChildren<ChildrenProps> = {
  children: ReactElement<ChildrenProps>;
};
