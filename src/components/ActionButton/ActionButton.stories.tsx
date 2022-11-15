import { Meta, StoryFn } from '@storybook/react';
import { ActionButton } from '.';
import { BiPen } from 'react-icons/bi';
import { RiMailAddLine } from 'react-icons/ri';

type BaseArgs = {
  color: string;
  backgroundNormal: string;
  backgroundHover: string;
  backgroundActive: string;
};

const meta: Meta<typeof ActionButton> = {
  title: 'Action Button',
  component: ActionButton,
  args: {
    color: '#2b2b2b',
    backgroundNormal: '#dcdcdc',
    backgroundHover: '#f4f4f4',
    backgroundActive: '#c2c2c2',
  },
};
export default meta;

const FakeScreen: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    style={{
      position: 'relative',

      width: '200px',
      height: '300px',

      background: '#a2a2a2',
      borderRadius: '8px',

      display: 'inline-block',
    }}
  >
    {children}
  </div>
);

export const Simple: StoryFn<BaseArgs & { icon: 'post' | 'chat' }> = ({
  icon,
  ...props
}) => {
  let iconElement: JSX.Element;
  switch (icon) {
    case 'post':
      iconElement = <BiPen />;
      break;
    case 'chat':
      iconElement = <RiMailAddLine />;
      break;
  }
  return (
    <FakeScreen>
      <ActionButton {...props}>{iconElement}</ActionButton>
    </FakeScreen>
  );
};
Simple.argTypes = {
  icon: {
    control: { type: 'select' },
    options: ['post', 'chat'],
    defaultValue: 'post',
  },
};
