import React from 'react';
import { stylesTable } from './tableStyles';
import { Table, Row } from 'react-native-table-component';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { Button } from '../Button/Button';
import { MeasureHistoryData } from '../../features/LoggedIn/Interfaces/MeasureHistoryData/MeasureHistoryData.interface';
import { stylesGlobal } from '../../features/LoggedIn/Utils/styling/globalStyles';
import { tt } from '../../locales/translation.config';

interface TableProps {
  headers: string[];
  data: MeasureHistoryData[];
  handleRowClick: (index: number) => void;
  index: number;
  setIndex: (index: number) => void;
  onEdit: () => void;
  onDelete: (index: number) => void;
}

const CustomTable: React.FC<TableProps> = ({
  headers,
  data,
  setIndex,
  onEdit,
  onDelete
}) => {
  return (
    <View style={stylesTable.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <Table borderStyle={stylesTable.borderStyles}>
            <Row
              data={headers}
              style={stylesTable.header}
              textStyle={[stylesTable.headerText]}
              widthArr={[100, 100, 100, 100, 100, 120, 120]}
            />
          </Table>

          <ScrollView style={stylesTable.dataWrapper}>
            <Table borderStyle={stylesTable.borderStyles}>
              {data.map((rowData, index) => (
                <Row
                  data={[
                    rowData.measureName,
                    rowData.value,
                    'mg/l',
                    rowData.createdAt,
                    rowData.updatedAt,
                    <View style={stylesTable.buttonContainer}>
                      <Button
                        textStyles={stylesGlobal.buttonText}
                        style={stylesGlobal.button}
                        title={tt('Edit')}
                        onTap={() => {
                          setIndex(rowData.id), onEdit();
                        }}
                        enabledActiveOpacity={true}
                        isloading={false}
                      />
                      <Button
                        textStyles={stylesGlobal.buttonText}
                        style={stylesGlobal.button}
                        title={tt('Delete')}
                        onTap={() => {
                          setIndex(rowData.id), onDelete(rowData.id);
                        }}
                        enabledActiveOpacity={true}
                        isloading={false}
                      />
                    </View>
                  ]}
                  widthArr={[100, 100, 100, 100, 100, 120, 120]}
                  style={[
                    stylesTable.row,
                    index % 2 === 1 && {
                      backgroundColor: Color.DISABLED_COLOR
                    }
                  ]}
                  textStyle={stylesTable.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomTable;
