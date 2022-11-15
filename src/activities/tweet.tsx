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
        color="#2b2b2b"
        backgroundNormal="#dcdcdc"
        backgroundHover="#f4f4f4"
        backgroundActive="#c2c2c2"
      >
        Test
      </ActionButton>
    </AppScreen>
  );
};
