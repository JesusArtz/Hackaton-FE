import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import NavBar from "../components/navbar";

export default function Charts({ session }) {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 35 }}>

            <NavBar active="Charts" />

            <View style={{ flex: 1, alignItems: "center" }}>
                <Text>Charts</Text>

                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                        
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 20}
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#fff",
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(236, 204, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#eeaeca"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
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