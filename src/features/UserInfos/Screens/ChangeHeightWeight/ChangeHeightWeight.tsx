import React from 'react';
import BMIRepresentation from '../../../LoggedIn/Components/BMIRepresentation/BMIRepresentation';
import { useAppSelector } from '../../../../hooks/hooks';

/**
 * Represents ChangeHeightWeight screen ui
 * @returns JSX.Element
 */
interface ChangeHeightWeightProps {}

const ChangeHeightWeight: React.FC<
  ChangeHeightWeightProps
> = ({}): JSX.Element => {
  const BMI = useAppSelector((state) => state.user.BMI);
  return (
    <>
      <BMIRepresentation bmi={BMI as number} />
    </>
  );
};

export default ChangeHeightWeight;
