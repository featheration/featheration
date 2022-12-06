import { FC, HTMLAttributes, SVGAttributes } from 'react';
import { z } from 'zod';
import { Plugin } from './plugin';

export interface Widget<T> {
  id: string;
  propsParser: z.Schema<T>;
  Icon?: FC<HTMLAttributes<Element> | SVGAttributes<Element>>;
  Component: FC<T>;
}

export function defineWidget<T>(widget: Widget<T>): Widget<T> {
  return widget;
}

const registry: Record<string, Widget<any>> = {};

export function registerWidget<T>(plugin: Plugin, widget: Widget<T>) {
  registry[`${plugin.id}:${widget.id}`] = widget;
}

export function unregisterWidget<T>(plugin: Plugin, widget: Widget<T>) {
  delete registry[`${plugin.id}:${widget.id}`];
}

export function getWidget(pluginId: string, widgetId: string): Widget<any> {
  return registry[`${pluginId}:${widgetId}`];
}
