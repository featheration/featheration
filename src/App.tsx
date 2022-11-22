import { useDrawer } from './components/Drawer';
import { Stack } from './stackflow';
import { Global } from '@emotion/react';
import { Animation, Reset } from './styles';
import { Toolbox } from './system/Toolbox';

export function App(): JSX.Element {
  const { Drawer, open, close } = useDrawer();

  return (
    <>
      <Global styles={[Reset, Animation]} />
      <Drawer>
        <Toolbox />
      </Drawer>
      <div>
        <Stack />
      </div>
    </>
  );
}
