import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Create a go back button in the top left corner of the screen
export default function BackBar({ session, navigation, title }) {

    return (
        <View style={styles.BackBar}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "300", paddingLeft: 20 }}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    BackBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingTop: 30, 
        backgroundColor:"white", 
        height:"10%",
    }
});
