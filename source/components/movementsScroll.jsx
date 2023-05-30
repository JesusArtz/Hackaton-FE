import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import Movements from "./movements";

export default function MovementsScroll({ data }) {

    return (
        <ScrollView style={{ flex: 1, width: "100%" }}>

            {data.map((item, key) => (
                <Movements key={key} data={item} />
            ))}

        </ScrollView>
    )

}