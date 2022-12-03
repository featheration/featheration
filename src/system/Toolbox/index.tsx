import styled from '@emotion/styled';
import { forwardRef, HTMLAttributes } from 'react';
import { getWidget } from '../../api/widget';
import { Trans } from 'react-i18next';
import i18next from 'i18next';

const Wrap = styled.div`
  width: 40vw;
  height: 100vh;
  background: black;
  color: white;
  z-index: 10;
`;

export interface WidgetItem {
  type: 'widget';
  plugin: string;
  widget: string;
}

export type ToolboxItem = WidgetItem;

export interface ToolboxProps extends HTMLAttributes<HTMLDivElement> {
  items: ToolboxItem[];
}

export const Toolbox = forwardRef<HTMLDivElement, ToolboxProps>(
  ({ items, ...props }: ToolboxProps, ref): JSX.Element => {
    return (
      <Wrap ref={ref} {...props}>
        {items.map((item) => {
          switch (item.type) {
            case 'widget': {
              const widget = getWidget(item.plugin, item.widget);
              return (
                <div key={`widget/${item.plugin}-${item.widget}`}>
                  {widget && widget.Icon && <widget.Icon />}
                  <Trans
                    ns={item.plugin}
                    i18nKey={`widget.${item.widget}.name`}
                  />
                </div>
              );
            }
            default:
              return 'Unknown item';
          }
        })}
      </Wrap>
    );
  },
);
