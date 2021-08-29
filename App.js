import React from 'react';
import { ViroARSceneNavigator } from '@viro-community/react-viro';

import { BusinessCard } from './js/BusinessCard';

export default () => {

  return (
    <ViroARSceneNavigator 
      numberOfTrackedImages={2}
      initialScene={{scene: BusinessCard}} 
    />
  );
}