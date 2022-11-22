import styled from '@emotion/styled';
import { forwardRef, HTMLAttributes } from 'react';

const Wrap = styled.div`
  width: 40vw;
  height: 100vh;
  background: black;
  z-index: 10;
`;

export interface ToolboxProps extends HTMLAttributes<HTMLDivElement> {}

export const Toolbox = forwardRef<HTMLDivElement>(
  ({ ...props }: ToolboxProps, ref): JSX.Element => {
    console.log(props);
    return (
      <Wrap ref={ref} {...props}>
        안녕하세요
      </Wrap>
    );
  },
);
