import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { HomeActivity } from './activities/home';
import { TweetActivity } from './activities/tweet';
import '@stackflow/plugin-basic-ui/index.css';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
  activities: {
    HomeActivity,
    TweetActivity,
  },
  initialActivity(args) {
    return 'HomeActivity';
  },
});
