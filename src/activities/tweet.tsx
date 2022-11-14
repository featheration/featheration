import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActionButton } from '../components/ActionButton';

export interface TweetActivityProps {
  tweet: {
    text: string;
  };
}

export const TweetActivity: React.FC<{ params: TweetActivityProps }> = ({
  params: { tweet },
}) => {
  return (
    <AppScreen appBar={{ title: 'Tweet' }}>
      {tweet.text}
      <ActionButton>Test</ActionButton>
    </AppScreen>
  );
};
