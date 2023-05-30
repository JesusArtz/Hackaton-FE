import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from "react-native";
import NavBar from "../components/navbar";

export default function Profile({ callback }) {
    return (
        <SafeAreaView style={styles.container}>

            <NavBar active="Profile" />

            <View style={styles.container}>
                <TouchableOpacity onPress={() => callback({})}>
                    <Text>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    }
})
