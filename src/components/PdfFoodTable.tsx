import React from 'react';
import {Page, Text, View, Document, StyleSheet, Font, Image, Link} from '@react-pdf/renderer';
import {IFoodItem} from "../interfaces/FoodItem";
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import bowl from "../assets/images/salad.png";

Font.register({ family: 'Roboto', src: RobotoRegular });
Font.register({ family: 'RobotoBold', src: RobotoBold, fontWeight: 'bold' });

const styles = StyleSheet.create({
    logo: {
        width: "35px",
        height: "auto",
        marginLeft: "30px",
        marginTop: "15px"
    },
    title: {
        textAlign: "center",
        paddingTop: "20px",
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
        marginBottom: "20px"
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
    },
    link: {
        fontFamily: 'Roboto',
        fontSize: 10,
    },
});

interface PdfFoodTableProps {
    data: IFoodItem[];
}

export const PdfFoodTable: React.FC<PdfFoodTableProps> = ({data}) => (
    <Document title="Your food table">
        <Page size="A4">
            <Image style={styles.logo} src={bowl}></Image>
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
                <Link style={styles.link} src={"https://food-calculator-by-val.netlify.app/"}>Add more healthy food</Link>
            </View>
        </Page>
    </Document>
);