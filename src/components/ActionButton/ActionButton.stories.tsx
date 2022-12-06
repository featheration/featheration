import { Meta, StoryFn } from '@storybook/react';
import { ActionButton, ActionButtonProps } from '.';
import { BiPen } from 'react-icons/bi';
import { RiMailAddLine } from 'react-icons/ri';
import { MouseEventHandler, useState } from 'react';

interface ActionButtonExtendedProps extends ActionButtonProps {
  textColor: string;
  backgroundNormal: string;
  backgroundHover: string;
  backgroundActive: string;
}

function ActionButtonExtended({
  textColor,
  backgroundNormal,
  backgroundHover,
  backgroundActive,
  ...props
}: ActionButtonExtendedProps): JSX.Element {
  return (
    <ActionButton
      style={{
        '--action-button-background-normal': backgroundNormal,
        '--action-button-background-hover': backgroundHover,
        '--action-button-background-active': backgroundActive,
        '--action-button-text': textColor ?? '',
      }}
      {...props}
    />
  );
}

const meta: Meta<typeof ActionButtonExtended> = {
  title: 'Action Button',
  component: ActionButton,
  args: {
    textColor: '#2b2b2b',
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
  ActionButtonExtendedProps & { icon: IconName } & {
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
> = ({ icon, ...props }) => {
  return (
    <FakeScreen>
      <ActionButtonExtended {...props}>
        <Icon icon={icon} />
      </ActionButtonExtended>
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

export const Animation: StoryFn<ActionButtonExtendedProps> = (props) => {
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
      <ActionButtonExtended {...props} onClick={switchIcon}>
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
      </ActionButtonExtended>
    </FakeScreen>
  );
};

Animation.parameters = {
  controls: {
    exclude: ['onClick'],
  },
};
