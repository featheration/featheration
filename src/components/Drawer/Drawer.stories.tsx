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
    },
  },
  args: {
    side: Side.Left,
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

const FakeDrawerContent: React.FC<
  React.PropsWithChildren<
    { side: Side } & HTMLAttributes<HTMLDivElement> &
      RefAttributes<HTMLDivElement>
  >
> = forwardRef(({ side, children, ...props }, ref) => {
  const createRainbowDiv = (hue: number) => ({
    flex: 1,
    fontSize: '2rem',
    fontWeight: 900,
    background: `hsl(${hue}, 50%, 70%)`,
  });

  return (
    <div
      {...props}
      ref={ref}
      style={{
        ...props.style,

        background: '#d2d2d2',

        ...(side === Side.Left || side === Side.Right
          ? { height: '600px', width: '300px', flexDirection: 'row' }
          : {}),
        ...(side === Side.Top || side === Side.Bottom
          ? { height: '400px', width: '400px', flexDirection: 'column' }
          : {}),
        display: 'flex',

        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {[0, 30, 70, 120, 180, 210, 270].map((hue, index) => (
        <div key={hue} style={createRainbowDiv(hue)}>
          {index + 1}
        </div>
      ))}
    </div>
  );
});

export const Simple: StoryFn<BaseArgs> = ({ side, ...props }) => {
  const { Drawer } = useDrawer({
    side,
  });

  return (
    <FakeScreen>
      <Drawer {...props}>
        <FakeDrawerContent side={side} />
      </Drawer>
    </FakeScreen>
  );
};
