import { HTMLAttributes } from 'react';

export interface ToolboxProps extends HTMLAttributes<HTMLDivElement> {}

export function Toolbox({ ...props }: ToolboxProps): JSX.Element {
  return <div {...props}></div>;
}
