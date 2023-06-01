import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import NavBar from "../components/navbar";

export default function Transfer({ session }){
    return(
        <SafeAreaView style={{ flex: 1, paddingTop: 35 }}>

            <NavBar active="Transfer" />

            <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Transfer</Text>
            </View>
        </SafeAreaView>
    );
}