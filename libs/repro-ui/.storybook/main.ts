import { rootMain } from '../../../.storybook/main';

import type { StorybookConfig, Options } from '@storybook/core-common';
import { withUnimodules } from '@expo/webpack-config/addons';

const config: StorybookConfig = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...(rootMain.addons || []), '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }: Options) => {
    // apply any global webpack configs that might have been specified in .storybook/main.ts
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType } as Options);
    }

    const newAliases = {
      ...(config?.resolve?.alias ?? {}),
      'react-native$': 'react-native-web',
      // 'react-native-svg':'react-native-svg-web',
      // 'path':'path-browserify',
    };
    config!.resolve!.alias = newAliases;

    return withUnimodules(config as any);
    // return config;
  },
};

module.exports = config;
