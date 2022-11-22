import { useDrawer } from './components/Drawer';
import { Stack } from './stackflow';
import { Global } from '@emotion/react';
import { Animation, Reset } from './styles';

export function App(): JSX.Element {
  const { Drawer, open, close } = useDrawer();

  return (
    <>
      <Global styles={[Reset, Animation]} />
      <div>
        <Stack />
      </div>
    </>
  );
}
