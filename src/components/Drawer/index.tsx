import { css, cx } from '@emotion/css';
import { Handler, useDrag } from '@use-gesture/react';
import { cloneElement, useCallback, useEffect, useRef } from 'react';
import { toPx } from '../../lib/to-px';
import { PropChildren, HasClassname, HasStyle, HasRef } from '../../utils/type';

const drawerBaseStyle = css`
  position: absolute;
  transition: transform 0s;
  will-change: transform;

  &[data-animate] {
    transition: transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

export interface DrawerConfig {
  beginThreshold?: string;
  toggleThreshold?: string;
}

export function useDrawer({
  beginThreshold: rawBeginThreshold,
  toggleThreshold = '50%',
}: DrawerConfig = {}): {
  Drawer: typeof Drawer;
  open: () => void;
  close: () => void;
} {
  let beginThreshold: string;
  if (rawBeginThreshold) {
    beginThreshold = rawBeginThreshold;
  } else {
    beginThreshold = '1vmin';
  }

  const runnersRef = useRef<Handler<'drag'>[]>([]);
  const openRef = useRef<Array<() => void>>([]);
  const closeRef = useRef<Array<() => void>>([]);

  useDrag(
    (event) => {
      runnersRef.current.forEach((runner) => runner(event));
    },
    {
      axis: 'x',
      target: window,
    },
  );

  const open = useCallback(() => {
    openRef.current.forEach((f) => f());
  }, []);

  const close = useCallback(() => {
    closeRef.current.forEach((f) => f());
  }, []);

  function Drawer<P extends HasClassname & HasStyle & HasRef>({
    children,
  }: PropChildren<P>): JSX.Element {
    if (children.props.ref) {
      throw new Error('Drawer children should not have ref');
    }
    const ref = useRef<HTMLElement>();

    useEffect(() => {
      let isOpen = false;
      let isDragging = false;
      let lastAnimation: number;

      function openDrawer() {
        if (!ref.current) {
          return;
        }
        startAnimation();
        isOpen = true;
        ref.current.style.transform = 'translateX(0)';
      }

      function closeDrawer() {
        if (!ref.current) {
          return;
        }
        startAnimation();
        isOpen = false;
        ref.current.style.transform = `translateX(-100%)`;
      }

      function startAnimation() {
        if (lastAnimation) {
          clearTimeout(lastAnimation);
        }
        const target = ref.current;
        if (!target) {
          return;
        }
        target.dataset['animate'] = '';
        lastAnimation = window.setTimeout(() => {
          delete target.dataset['animate'];
        }, 300);
      }

      const handler: Handler<'drag'> = ({
        down,
        movement: [mx, _my],
        values: [vx, _vy],
        first,
      }) => {
        if (!ref.current) {
          return;
        }

        if (first) {
          delete ref.current.dataset['animate'];
        }

        const evaluateToPx = (s: string) => toPx(s, ref.current, 'width');

        const length = ref.current.offsetWidth;

        if (!isOpen) {
          const threshold = evaluateToPx(beginThreshold);
          if (mx > threshold && !isDragging) {
            isDragging = true;
            startAnimation();
          }
          if (isDragging) {
            ref.current.style.transform = `translateX(calc(-100% + min(${vx}px, 100%)))`;
          }
        } else {
          ref.current.style.transform = `translateX(min(0px, max(${mx}px, -100%)))`;
        }
        if (!down) {
          isDragging = false;

          const threshold = evaluateToPx(toggleThreshold);

          const toOpen = !isOpen
            ? mx > 0 && vx > threshold
            : length + mx > threshold;

          if (toOpen) {
            openDrawer();
          } else {
            closeDrawer();
          }
        }
      };

      openRef.current.push(openDrawer);
      closeRef.current.push(closeDrawer);
      runnersRef.current.push(handler);
      return () => {
        runnersRef.current.splice(runnersRef.current.indexOf(handler), 1);
        openRef.current.splice(openRef.current.indexOf(openDrawer), 1);
        closeRef.current.splice(closeRef.current.indexOf(closeDrawer), 1);
      };
    }, []);

    const childrenWithProps = cloneElement(children, {
      ...children.props,
      className: cx(children.props.className, drawerBaseStyle),
      'data-animate': '',

      ref,
      style: {
        ...children.props.style,

        transform: `translateX(calc(-100%))`,
        left: 0,
      },
    });
    return childrenWithProps;
  }

  return {
    Drawer,
    open,
    close,
  };
}
