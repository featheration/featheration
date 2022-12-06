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
      <ActionButton
        style={{
          '--action-button-background-normal': '#dcdcdc',
          '--action-button-background-hover': '#f4f4f4',
          '--action-button-background-active': '#c2c2c2',
          '--action-button-text': '#2b2b2b',
        }}
      >
        Test
      </ActionButton>
    </AppScreen>
  );
};
