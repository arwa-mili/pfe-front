import React from 'react';

import CustomTable from '../../../../components/Table/Table';
import { MeasureHistoryData } from '../../Interfaces/MeasureHistoryData/MeasureHistoryData.interface';
import { tt } from '../../../../locales/translation.config';

interface MeasureHistoryPresenterProps {
  mesArray: MeasureHistoryData[];
  handleRowClick: (index: number) => void;
  index: number;
  setIndex: (index: number) => void;
  handleEdit: () => void;
  handleDelete: (index: number) => void;
}
const MeasureHistory: React.FC<MeasureHistoryPresenterProps> = ({
  mesArray,
  handleRowClick,
  index,
  setIndex,
  handleDelete,
  handleEdit
}) => {
  return (
    <>
      <CustomTable
        headers={[
          tt('Measure'),
          tt('Value'),
          tt('Unit'),
          tt('DateCreated'),
          tt('DateUpdated')
        ]}
        data={mesArray}
        handleRowClick={handleRowClick}
        index={index}
        setIndex={setIndex}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default MeasureHistory;
