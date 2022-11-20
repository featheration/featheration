import { Meta, StoryFn } from '@storybook/react';
import { ActionButton } from '.';
import { BiPen } from 'react-icons/bi';
import { RiMailAddLine } from 'react-icons/ri';
import { MouseEventHandler, useState } from 'react';

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
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

type IconName = 'post' | 'chat';
const Icon: React.FC<{ className?: string; icon: IconName }> = ({
  className,
  icon,
}) => {
  switch (icon) {
    case 'post':
      return <BiPen className={className} />;
    case 'chat':
      return <RiMailAddLine className={className} />;
  }
};

export const Simple: StoryFn<
  BaseArgs & { icon: IconName } & {
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
> = ({ icon, ...props }) => {
  return (
    <FakeScreen>
      <ActionButton {...props}>
        <Icon icon={icon} />
      </ActionButton>
    </FakeScreen>
  );
};
Simple.argTypes = {
  icon: {
    control: { type: 'select' },
    options: ['post', 'chat'],
  },
  onClick: {
    control: false,
  },
};
Simple.args = {
  icon: 'post',
};

export const Animation: StoryFn<BaseArgs> = (props) => {
  const [icon, setIcon] = useState<IconName | null>(null);

  const switchIcon = () => {
    switch (icon) {
      case null:
      case 'post':
        setIcon('chat');
        break;
      case 'chat':
        setIcon('post');
        break;
    }
  };

  return (
    <FakeScreen>
      <ActionButton {...props} onClick={switchIcon}>
        {icon === 'chat' ? (
          <>
            <ActionButton.AnimateIn>
              <Icon icon="chat" />
            </ActionButton.AnimateIn>
            <ActionButton.AnimateOut>
              <Icon icon="post" />
            </ActionButton.AnimateOut>
          </>
        ) : icon === 'post' ? (
          <>
            <ActionButton.AnimateIn reverse={true}>
              <Icon icon="post" />
            </ActionButton.AnimateIn>
            <ActionButton.AnimateOut reverse={true}>
              <Icon icon="chat" />
            </ActionButton.AnimateOut>
          </>
        ) : (
          <Icon icon="post" />
        )}
      </ActionButton>
    </FakeScreen>
  );
};

Animation.parameters = {
  controls: {
    exclude: ['onClick'],
  },
};
