import { Meta, StoryFn } from '@storybook/react';
import { forwardRef, HTMLAttributes, RefAttributes } from 'react';
import { useDrawer } from '.';

type BaseArgs = {};

const meta: Meta = {
  title: 'Drawer',
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
    HTMLAttributes<HTMLDivElement> &
      RefAttributes<HTMLDivElement> & { close: () => void }
  >
> = forwardRef(({ close, children, ...props }, ref) => {
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

        height: '600px',
        width: '300px',
        flexDirection: 'row',
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
      <button
        onClick={close}
        style={{
          fontSize: '1.5rem',
          fontWeight: '900',
          display: 'block',
          margin: '1rem auto',
          background: '#d2d2d2',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '1rem 2rem',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Close Drawer
      </button>
    </div>
  );
});

export const Simple: StoryFn<BaseArgs> = ({ ...props }) => {
  const { Drawer, open, close } = useDrawer({});

  return (
    <FakeScreen>
      <Drawer {...props}>
        <FakeDrawerContent close={close} />
      </Drawer>
      <button
        onClick={open}
        style={{
          fontSize: '2rem',
          fontWeight: '900',
          display: 'block',
          margin: '1rem auto',
          background: '#d2d2d2',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '1rem 2rem',
        }}
      >
        Open Drawer
      </button>
    </FakeScreen>
  );
};
