import { useEffect, useState } from 'react';
import { z } from 'zod';
import { defineWidget } from '../../api/widget';
import { FiClock } from 'react-icons/fi';

const propsParser = z.object({});

const Icon = FiClock;

function Component(props: z.infer<typeof propsParser>) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNow(new Date());
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {now.getFullYear()}-{now.getMonth() + 1}-{now.getDate()} {now.getHours()}:
      {now.getMinutes()}:{now.getSeconds()}
    </div>
  );
}

export const Clock = defineWidget({
  id: 'clock',
  propsParser,
  Icon,
  Component,
});
