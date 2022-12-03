import { registerWidget, unregisterWidget, Widget } from './widget';
import i18next, { Resource } from 'i18next';

export interface Plugin {
  id: string;
  widgets: Widget<any>[];
  locales: Resource;
}

export function definePlugin(plugin: Plugin): Plugin {
  return plugin;
}

export function loadPlugin(plugin: Plugin) {
  for (const [locale, resource] of Object.entries(plugin.locales)) {
    i18next.addResourceBundle(locale, plugin.id, resource, true);
  }
  for (const widget of plugin.widgets) {
    registerWidget(plugin, widget);
  }
  console.log(`Plugin loaded: ${plugin.id}`);
}

export function unloadPlugin(plugin: Plugin) {
  for (const locale of Object.keys(plugin.locales)) {
    i18next.removeResourceBundle(locale, plugin.id);
  }
  for (const widget of plugin.widgets) {
    unregisterWidget(plugin, widget);
  }
}
