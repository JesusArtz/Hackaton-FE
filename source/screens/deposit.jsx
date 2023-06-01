import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Dimensions, Button, Alert } from "react-native";
import BackBar from "../components/upBackBar";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from '@stripe/stripe-react-native';
import proxy from "../../proxy";
import { TextInput } from "@react-native-material/core";



export default function Deposit({ session }) {

    const navigation = useNavigation();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);



    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${proxy}/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': session.token
            },
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            navigation.navigate('Unsuccessful');
        } else {
            await fetch(`${proxy}/save-transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': session.token
                },
                body: JSON.stringify({
                    amount: 100,
                    type: "deposit",
                    token: session.token,
                    date: new Date().toISOString().slice(0, 10),
                })
            });
            navigation.navigate('Successful');
            
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);



    return (
        <SafeAreaView style={{ flex: 1 }}>

            <BackBar session={session} navigation={navigation} title="Deposit" />

            <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Deposit</Text>
                <TextInput style={{ width: 200, height: 50, backgroundColor: "white", borderRadius: 10, marginTop: 20 }} keyboardType="numeric" label="Monto" />
                <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: "pink", borderRadius: 10, marginTop: 20 }} onPress={() => openPaymentSheet()} disabled={!loading}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", paddingTop: 10 }}>Deposit</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}