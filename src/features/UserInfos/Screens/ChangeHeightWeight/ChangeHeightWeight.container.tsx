import React from 'react';

import ChangeHeightWeight from './ChangeHeightWeight';
import { CHANGEHEIGHTWEIGHT_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { DrawerScreenProps } from '@react-navigation/drawer';

/**
 * Container used to separate ChangeHeightWeight logic as a wrapper to ChangeHeightWeight screen
 * @returns JSX.Element
 */
interface ChangeHeightWeightContainerProps
  extends DrawerScreenProps<
    DrawerNavigatorParamList,
    typeof CHANGEHEIGHTWEIGHT_SCREEN
  > {}

const ChangeHeightWeightContainer: React.FC<
  ChangeHeightWeightContainerProps
> = ({}): JSX.Element => {
  return <ChangeHeightWeight />;
};

export default ChangeHeightWeightContainer;
