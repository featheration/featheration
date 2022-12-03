import { definePlugin } from '../../api/plugin';
import { Clock } from './widget';

import enUS from './locales/en-US.json';
import koKR from './locales/ko-KR.json';

const ClockPlugin = definePlugin({
  id: 'clock',
  widgets: [Clock],
  locales: {
    'ko-KR': koKR,
    'en-US': enUS,
  },
});

export default ClockPlugin;
