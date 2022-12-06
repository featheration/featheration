import styled from '@emotion/styled';
import { forwardRef, HTMLAttributes } from 'react';
import { getWidget } from '../../api/widget';
import { Trans } from 'react-i18next';
import { css } from '@emotion/css';

const Wrap = styled.div`
  width: min(22.5rem, 100dvw);
  height: calc(100dvh - 1rem);

  background: white;
  color: black;

  margin: 0.5rem;
  border-radius: 1rem;
  // border-radius: 0 1rem 1rem 0;
  padding: 0 1rem 0 1rem;
`;

export interface WidgetItem {
  type: 'widget';
  pluginId: string;
  widgetId: string;
  active: boolean;
}

const WidgetItemViewWrap = styled.div`
  // Actually, it's 24dp on guideline but that includes inner-margin of the icon.
  font-size: 1.25rem;

  height: 3.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 1rem;
  padding: 0 0.75rem 0 0.75rem;

  &:hover {
    background: #f4f4f4;
  }
`;

const WidgetIcon = css`
  margin-right: 0.75rem;
`;

function WidgetItemView({ pluginId, widgetId }: WidgetItem) {
  const widget = getWidget(pluginId, widgetId);
  return (
    <WidgetItemViewWrap>
      {widget && widget.Icon && <widget.Icon className={WidgetIcon} />}
      <Trans ns={pluginId} i18nKey={`widget.${widgetId}.name`} />
    </WidgetItemViewWrap>
  );
}

export interface DividerItem {
  type: 'divider';
}

const DividierItemView = styled.hr`
  border-color: currentColor;
  margin: calc(3.5rem / 2 - 1px) 0.75rem calc(3.5rem / 2) 0.75rem;
`;

export type ToolboxItem = WidgetItem | DividerItem;

export interface ToolboxProps extends HTMLAttributes<HTMLDivElement> {
  items: ToolboxItem[];
}

export const Toolbox = forwardRef<HTMLDivElement, ToolboxProps>(
  ({ items, ...props }: ToolboxProps, ref): JSX.Element => {
    return (
      <Wrap ref={ref} {...props}>
        {items.map((item, idx) => {
          switch (item.type) {
            case 'widget': {
              return (
                <WidgetItemView
                  key={`widget-${idx}/${item.pluginId}-${item.widgetId}`}
                  {...item}
                />
              );
            }
            case 'divider': {
              return <DividierItemView key={`divider-${idx}`} {...item} />;
            }
            default:
              return 'Unknown item';
          }
        })}
      </Wrap>
    );
  },
);
