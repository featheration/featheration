import { useDrawer } from './components/Drawer';
import { Stack } from './stackflow';
import { Global } from '@emotion/react';
import { Animation, Reset } from './styles';
import { Toolbox } from './system/Toolbox';
import { useEffect, useState } from 'react';
import { loadPlugin } from './api/plugin';
import ClockPlugin from './plugins/clock';
import { initializeI18n } from './lib/featheration/intl';

export function App(): JSX.Element {
  const { Drawer, open, close } = useDrawer({
    gestureMode: 'from-left',
  });
  const [i18n, setI18n] = useState(false);
  const [widget, setWidget] = useState(false);

  useEffect(() => {
    initializeI18n().then(() => setI18n(true));
  }, []);

  useEffect(() => {
    if (!i18n) {
      return;
    }
    loadPlugin(ClockPlugin);

    setWidget(true);
  }, [i18n]);

  return (
    <>
      <Global styles={[Reset, Animation]} />
      <Drawer>
        {widget ? (
          <Toolbox
            items={[
              {
                type: 'widget',
                pluginId: 'clock',
                widgetId: 'clock',
                active: false,
              },
              {
                type: 'widget',
                pluginId: 'clock',
                widgetId: 'clock',
                active: true,
              },
              {
                type: 'divider',
              },
              {
                type: 'widget',
                pluginId: 'clock',
                widgetId: 'clock',
                active: false,
              },
            ]}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Drawer>
      <div>
        <Stack />
      </div>
    </>
  );
}
