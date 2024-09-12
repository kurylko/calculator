import React from 'react';
import {Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import {IFoodItem} from "../interfaces/FoodItem";
// @ts-ignore
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf";
// @ts-ignore
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";

Font.register({ family: 'Roboto', src: RobotoRegular });
Font.register({ family: 'RobotoBold', src: RobotoBold, fontWeight: 'bold' });

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        paddingTop: "30px",
        fontFamily: 'RobotoBold',
    },
    tableContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    table: {
        display: "flex",
        justifyContent: "center",
        width: "90%",
        marginTop: "30px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRightWidth: 0,
        borderBottomWidth: 0,
        fontFamily: 'Roboto',
        fontSize: 12,
    },
    tableRow: {
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    }
});

interface PdfFoodTableProps {
    data: IFoodItem[];
}

export const PdfFoodTable: React.FC<PdfFoodTableProps> = ({data}) => (
    <Document>
        <Page size="A4">
            <Text style={styles.title}>Food with nutrition values</Text>
            <View style={styles.tableContainer}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Food</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Calories (/kg)</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Fat,g (/kg)</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Carbs,g (/kg)</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Protein,g (/kg)</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Weight,g</Text></View>
                </View>

                {data.map((row, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.foodName}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.calories}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.fat}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.protein}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row.carbohydrate}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{row?.weight}</Text></View>
                    </View>
                ))}
            </View>
            </View>
        </Page>
    </Document>
);