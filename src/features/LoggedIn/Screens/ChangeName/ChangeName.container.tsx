import React from 'react';
import ChangeName, {
  ChangeNameSchema,
  ChangeNameSchemaType
} from './ChangeName';
import { ChangeName_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Container used to separate ChangeName logic as a wrapper to ChangeName screen
 * @returns JSX.Element
 */

interface ChangeNameContainerProps
  extends DrawerScreenProps<
    DrawerNavigatorParamList,
    typeof ChangeName_SCREEN
  > {}

const ChangeNameContainer: React.FC<
  ChangeNameContainerProps
> = ({}): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangeNameSchemaType>({
    resolver: zodResolver(ChangeNameSchema)
  });

  return (
    <ChangeName
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={async () => console.log('hello')}
    />
  );
};

export default ChangeNameContainer;
