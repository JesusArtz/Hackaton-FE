import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewBase, Image, BackHandler, ToastAndroid, ScrollView, ImageBackground, SafeAreaView, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import proxy from "../../proxy";
import NavBar from "../components/navbar";
import { faMoneyBillTransfer, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Movements from "../components/movements";

function Home({ session, callback }) {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [ref, setRef] = useState(null);
    const heightPercentage = Dimensions.get("window").height * 0.56;

    const movements = [
        {
            name: "Transferencia",
            amount: "$15.00"
        },
        {
            name: "Deposito",
            amount: "$100.00"
        },
        {
            name: "Transferencia",
            amount: "$10.00"
        },
        {
            name: "Deposito",
            amount: "$500.00"
        },
        {
            name: "Transferencia",
            amount: "$400.00"
        },
        
    ]

    // suma de los movimientos depositos y transferencias
    const totalDeposits = movements.reduce((total, movement) => {
        if (movement.name === "Deposito") {
            return total + parseFloat(movement.amount.replace('$', ''));
        }
        return total;
    }, 0);

    const totalTransfers = movements.reduce((total, movement) => {
        if (movement.name === "Transferencia") {
            return total + parseFloat(movement.amount.replace('$', ''));
        }
        return total;
    }, 0);


    if (session.token === '' || session.token === undefined) {
        navigation.navigate({ name: 'Main', params: { callback: callback } });
    }


    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => handler.remove();
    });

    // Create a loading function
    const loadingFunction = () => {
        setLoading(false);
    }

    // Create a function to get the user data
    const getUserData = async () => {
        try {
            const response = await fetch(proxy + '/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': session.token
                }
            });
            const json = await response.json();
            setUser(json);
            loadingFunction();
        } catch (error) {
            console.error(error);
        }
    }

    // Call the function to get the user data
    useEffect(() => {
        getUserData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 35, backgroundColor: "pink" }}>

            <NavBar active="Home" />


            <View style={{ zIndex: 10, backgroundColor: "pink", height: 150 }}>
                <View>
                    <Text style={styles.textLog} >Bienvenido, {user.name}</Text>

                </View>
                {/* <View style={styles.card}>
                    <Text style={styles.cardText2}>{user.name} {user.lastName}</Text>
                    <Text style={styles.cardText}>{user.account}</Text>
                    <Text style={styles.cardText}>${user.balance}</Text>
                </View> */}

                <View>
                    <Text style={styles.balanceText} >Cuenta</Text>
                    <Text style={styles.balanceText} >${user.balance}.00</Text>
                </View>
            </View>

            <View style={{ zIndex: 11, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: "white", height: "100%" }} >
                <View style={styles.horizontalButtonsView}>
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('SendMoney')}>
                            <View style={styles.horizontalButtonsRounded}>
                                <FontAwesomeIcon icon={faMoneyBillTransfer} size={30} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.horizontalButtonsText}>Enviar</Text>
                    </View>

                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('SendMoney')}>
                            <View style={styles.horizontalButtonsRounded}>
                                <FontAwesomeIcon icon={faCoins} size={25} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.horizontalButtonsText}>Depositar</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    {/*Apartado de historial de transferencias y depositos*/}
                    <Text style={{ fontSize: 20, paddingTop: 20 }}>Historial</Text>
                    <View style={{ flexDirection: "row", paddingTop: 30 }}>
                        <View style={{ flexDirection: "column", alignItems: "center" }}>
                            <Text style={{ fontSize: 15 }}>Transferencias</Text>
                            <Text style={{ fontSize: 15 }}>${totalTransfers}</Text>
                        </View>
                        <View style={{ flexDirection: "column", alignItems: "center", paddingLeft: 20 }}>
                            <Text style={{ fontSize: 15 }}>Depositos</Text>
                            <Text style={{ fontSize: 15 }}>${totalDeposits}</Text>
                        </View>
                    </View>

                    <ScrollView style={{ paddingBottom: 10, width: "100%", height: Dimensions.get("window").height - heightPercentage}} contentContainerStyle={{flexGrow: 1}}>
                        {movements.map((movement, index) => {
                            return (
                                <Movements key={index} data={movement} />
                            )
                        })
                        }
                    </ScrollView>

                </View>
            </View>

        </SafeAreaView>
    );


}

const styles = StyleSheet.create({

    textLog: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: "#ffffff",
        width: 350,
        height: 150,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cardText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 10,

        paddingBottom: 10,
    },
    cardText2: {
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    balanceContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },
    balanceText: {
        fontSize: 20,
        fontWeight: "400",
        color: "black",
        textAlign: "center",
    },

    horizontalButtonsView: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    horizontalButtonsRounded: {
        backgroundColor: "#ffffff",
        width: 50,
        height: 50,
        borderRadius: 100,
        padding: 10,
        margin: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalButtonsText: {
        fontSize: 20,
        fontWeight: "300",
        color: "black",
        textAlign: "center",
        paddingBottom: 10,
    },




});

export default Home;