import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Link,
} from '@react-pdf/renderer';
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';
import RobotoBold from '../assets/fonts/Roboto-Bold.ttf';
import graph2 from '../assets/images/graph (2).png';
import { FoodWithNutriScore } from './FoodTable';

Font.register({ family: 'Roboto', src: RobotoRegular });
Font.register({ family: 'RobotoBold', src: RobotoBold, fontWeight: 'bold' });

const styles = StyleSheet.create({
  page: {
    padding: '10px',
  },
  borderContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#85A9E6',
    borderRadius: 5,
    padding: '20px',
    margin: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },
  logo: {
    width: '100px',
    height: 'auto',
    marginLeft: '30px',
    marginTop: '15px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'RobotoBold',
  },
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    marginTop: '30px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    fontFamily: 'Roboto',
    fontSize: 12,
    marginBottom: '20px',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableRowHead: {
    backgroundColor: '#85A9E6',
    flexDirection: 'row',
  },
  link: {
    fontFamily: 'Roboto',
    fontSize: 10,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: '20px',
  },
  graph: {
    width: '100px',
    height: 'auto',
  },
  generatedBy: {
    fontFamily: 'Roboto',
    fontSize: 10,
  },
});

interface PdfFoodTableProps {
  data: FoodWithNutriScore[];
}

export const PdfFoodTable = ({ data }: PdfFoodTableProps) => (
  <Document title="Your food table">
    <Page style={styles.page} size="A4">
      <View style={styles.borderContainer}>
        <View style={styles.content}>
          <View style={styles.top}>
            <Image style={styles.logo} src={graph2}></Image>
            <Text style={styles.title}>Your food list</Text>
            <View style={styles.tableContainer}>
              <View style={styles.table}>
                <View style={styles.tableRowHead}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Food</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Calories (/kg)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Fat,g (/kg)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Carbs,g (/kg)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Protein,g (/kg)</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Weight,g</Text>
                  </View>
                </View>

                {data.map((item: FoodWithNutriScore) => (
                  <View style={styles.tableRow} key={item.foodName}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.foodName}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text
                        style={styles.tableCell}
                      >{`${item.calories} (${item?.nutriScorePerKg?.caloriesValuePerKg ?? '-'})`}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text
                        style={styles.tableCell}
                      >{`${item.fat} (${item?.nutriScorePerKg?.fatValuePerKg ?? '-'})`}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.protein}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text
                        style={styles.tableCell}
                      >{`${item.carbohydrate} (${item?.nutriScorePerKg?.carbohydrateValuePerKg ?? '-'})`}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item?.weight}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <Link
                style={styles.link}
                src={'https://food-calculator-by-val.netlify.app/'}
              >
                Add more healthy food
              </Link>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.generatedBy}>
              Generated by{' '}
              <Link
                style={styles.link}
                src={'https://food-calculator-by-val.netlify.app/'}
              >
                food-calculator-by-val.netlify.app
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
