import React from 'react';
import {Page, Text, View, Document, StyleSheet, Font, Image, Link} from '@react-pdf/renderer';
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf";
import bowl from "../assets/images/salad.png";
import { FoodWithNutriScore} from "./FoodTable";
import avocado from  "../assets/images/avocado-small.jpg";

Font.register({ family: 'Roboto', src: RobotoRegular });
Font.register({ family: 'RobotoBold', src: RobotoBold, fontWeight: 'bold' });

const styles = StyleSheet.create({
    logo: {
        width: "55px",
        height: "auto",
        marginLeft: "30px",
        marginTop: "15px",
        borderRadius: "50%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
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
        borderRadius: "5px",
        fontFamily: 'Roboto',
        fontSize: 12,
        marginBottom: "20px"
    },
    tableRow: {
        flexDirection: "row",
        borderRadius: "5px",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
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
    data: FoodWithNutriScore[];
}

export const PdfFoodTable: React.FC<PdfFoodTableProps> = ({data}) => (
    <Document title="Your food table">
        <Page size="A4">
            <Image style={styles.logo} src={avocado}></Image>
            <Text style={styles.title}>Your food list</Text>
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

                {data.map((item: FoodWithNutriScore) => (
                    <View style={styles.tableRow} key={item.foodName}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{item.foodName}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{`${item.calories} (${item?.nutriScorePerKg?.caloriesValuePerKg ?? '-'})`}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{`${item.fat} (${item?.nutriScorePerKg?.fatValuePerKg ?? '-'})`}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{item.protein}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{`${item.carbohydrate} (${item?.nutriScorePerKg?.carbohydrateValuePerKg ?? '-'})`}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{item?.weight}</Text></View>
                    </View>
                ))}
            </View>
                <Link style={styles.link} src={"https://food-calculator-by-val.netlify.app/"}>Add more healthy food</Link>
            </View>
        </Page>
    </Document>
);