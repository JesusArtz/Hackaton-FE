import React, { useEffect, useState } from "react";
import { View, Button, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { TextInput, IconButton } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as yup from 'yup';
import proxy from "../../../proxy";

export default function Login({callback}) {

    const navigation = useNavigation()
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Introduce un correo valido")
            .required("El correo electronico es requerido"),
        password: yup
            .string()
            .min(8, ({min}) => `La contraseña debe tener almenos ${min} caracteres`)
            .required("La contraseña es requerida")
    })

    

    const handlePasswordVisibility = () => {  
        if (rightIcon === 'eye') {  
            setRightIcon('eye-with-line');  
            //setRightIconColor('#FF0000')  
            setPasswordVisibility(!passwordVisibility);  
        } else if (rightIcon === 'eye-with-line') {  
            setRightIcon('eye');  
            //setRightIconColor('#0C8A7B')
            setPasswordVisibility(!passwordVisibility);  
        }  
    };  

    return (
        <ScrollView>
            
            <View style={styles.container}>
            <View>
                </View>
                    <Text style={styles.textLog} numberOfLines={2}>Iniciar Sesion</Text>
                <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginValidationSchema}
                        onSubmit={async values => {
                            await fetch(proxy+'/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': "*"
                                },
                                body: JSON.stringify(values)
                            }).then(res => res.json()).then(res => callback(res))
                            navigation.navigate("Home")
                        }}>

                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                            <>
                                
                                    <TextInput
                                        label="Email"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        // Only numbers and 14 characters
                                        variant="outlined"
                                        style={{paddingTop:20}}
                                        leading={props => <Icon name="account" {...props} />}
                                        color="#fc049c"
                                    />
                                    {errors.email && 
                                        <Text style={{fontSize:15, fontWeight:"200", color:'red'}}>{errors.email}</Text>
                                    }
                                    <TextInput
                                        secureTextEntry={passwordVisibility}
                                        label="Password"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        variant="outlined"
                                        style={{paddingTop:20}}
                                        trailing={props => (
                                            <IconButton icon={props => <Entypo name={rightIcon} onPress={handlePasswordVisibility}  {...props} /> }{...props}/>
                                        )}
                                        color="#fc049c"
                                    />
                                    {errors.password && 
                                        <Text style={{fontSize:15, fontWeight:"200", color:'red'}}>{errors.password}</Text>
                                    }
                                <View style={{paddingTop:20}}>
                                    <TouchableOpacity style={styles.buttonBackground} onPress={handleSubmit} disabled={!isValid}>
                                        <Text style={styles.buttonText}>Iniciar Sesion</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
            </View> 
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    textLog: {
        fontSize: 50,
        fontWeight: "bold",
        paddingBottom: 60
    },
    
    container: {
        display: 'flex',
        alignContent: 'center',
        padding: 30,
        paddingTop: 100,
    },

    inputStyles: {
        flex: 1,
        padding: 0,
        marginBottom: '20%',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    buttonBackground: {
        backgroundColor: "#fc049c",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
    },

})

