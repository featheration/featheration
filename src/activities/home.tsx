import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useFlow } from '../stackflow';

export const HomeActivity: ActivityComponentType = () => {
  const { push } = useFlow();

  const onClick = (text: string) => {
    push('TweetActivity', {
      tweet: {
        text,
      },
    });
  };

  return (
    <AppScreen appBar={{ title: 'Home' }}>
      <div onClick={onClick.bind(null, 'Hello')}>Hello</div>
      <div onClick={onClick.bind(null, 'world')}>world</div>
    </AppScreen>
  );
};
