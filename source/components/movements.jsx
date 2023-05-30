import React, {useState} from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

// create a movements component
export default function Movements({ key, data }) {
    
    const [dataSourceCords, setDataSourceCords] = useState([])
    
    return (
        <View 
            style={{paddingTop: 10, paddingHorizontal:10}} 
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                dataSourceCords[key] = layout.y;
                setDataSourceCords(dataSourceCords);
                console.log(dataSourceCords);
                console.log('height:', layout.height);
                console.log('width:', layout.width);
                console.log('x:', layout.x);
                console.log('y:', layout.y);
            }} >
            <View style={styles.movement}>
                <Text style={styles.movementText}>{data.name}</Text>
                <Text style={styles.movementText}>{data.amount}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    movement: {
        flexDirection: "column",
        padding: 10,
        backgroundColor: "#ffffff",
        width: "100%",
        height: 75,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    movementText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 20,

    },

});
