import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewBase, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Img from '../../assets/cash.png';


export default function Main({session}) {

    const navigation = useNavigation();

    if(session.token){
        navigation.navigate('Home');
    }

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Boost</Text>
                <Text style={styles.title}>My Cash</Text>
            </View>
            <Image source={Img} style={{ width: 150, height: 150, alignSelf: "center", marginTop: 100 }} />
            <View style={styles.buttonContainer} >
                <View style={{ padding: 10 }} >
                    <TouchableOpacity style={styles.buttonBackground} onPress={() => navigation.navigate('Login')} >
                        <Text style={styles.buttonText}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }} >
                    <TouchableOpacity style={styles.buttonBackground} onPress={() => navigation.navigate('Register')} >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </View>
                
            
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 70,
        paddingLeft: 30,
    },

    title: {
        fontSize: 40,
        fontWeight: "bold",
    },

    buttonContainer: {
        paddingHorizontal: 30,
        paddingTop: 50,
    },


    buttonBackground: {
        backgroundColor: "#fc049c",
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
    },


});