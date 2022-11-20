import { Meta, StoryFn } from '@storybook/react';
import { forwardRef, HTMLAttributes, RefAttributes, useRef } from 'react';
import { Side, useDrawer } from '.';

type BaseArgs = {
  side: Side;
};

const meta: Meta = {
  title: 'Drawer',
  argTypes: {
    side: {
      control: { type: 'select' },
      options: Object.values(Side),
      defaultValue: Side.Left,
    },
  },
};
export default meta;

const FakeScreen: React.FC<
  React.PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
  >
> = forwardRef(({ children, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      ...props.style,

      position: 'relative',

      width: '400px',
      height: '600px',

      background: '#a2a2a2',
      borderRadius: '8px',

      display: 'inline-block',
      overflow: 'hidden',

      touchAction: 'none',
    }}
  >
    {children}
  </div>
));

const FakeDrawerContentWrap: React.FC<
  React.PropsWithChildren<
    { side: Side } & HTMLAttributes<HTMLDivElement> &
      RefAttributes<HTMLDivElement>
  >
> = forwardRef(({ side, children, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      ...props.style,

      background: '#d2d2d2',

      ...(side === Side.Left || side === Side.Right
        ? { height: '600px', width: '300px' }
        : {}),
      ...(side === Side.Top || side === Side.Bottom
        ? { height: '400px', width: '400px' }
        : {}),

      touchAction: 'none',
    }}
  >
    {children}
  </div>
));

export const Simple: StoryFn<BaseArgs> = ({ side, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { bind, Drawer } = useDrawer(side);

  return (
    <FakeScreen ref={ref} {...bind()}>
      <Drawer {...props} dragHandle={ref} drawSpeedMultiplier={1}>
        <FakeDrawerContentWrap side={side} {...bind()}>
          Drawer
        </FakeDrawerContentWrap>
      </Drawer>
    </FakeScreen>
  );
};
