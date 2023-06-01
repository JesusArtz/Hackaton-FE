import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Dimensions, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Unsuccessful({ data, session }) {

    const navigation = useNavigation();
    const [countDown, setCountDown] = React.useState(3);
    console.log(data);
    

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCountDown((prev) => {
                if (prev === 0) {
                    clearInterval(timer);
                    navigation.navigate("Home");
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Error</Text>
                <Text style={styles.text}>Your payment was unsuccessful.</Text>
                <Text style={styles.text}>You will be redirected to the home in {countDown} seconds.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ff4f58",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    content: {
        width: Dimensions.get("window").width * 0.9,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        marginTop: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#FF2D55",
        width: Dimensions.get("window").width * 0.9,
        height: 50,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
