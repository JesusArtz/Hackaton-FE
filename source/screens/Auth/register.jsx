import React, { useEffect, useState } from "react";
import { View, Button, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as yup from 'yup';
import { Entypo, AntDesign } from '@expo/vector-icons';
import proxy from "../../../proxy";



export default function Register({callback}) {

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
            .required("La contraseña es requerida"),
        curp: yup
            .string()
            .required("Ingresa tu CURP")
            .matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, "La CURP no es valida"),
        name: yup
            .string()
            .required("Es necesario colocar tu nombre"),
        lastName: yup
            .string()
            .required("Es necesario colocar tus apellidos")
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
                    <Text style={styles.textLog} numberOfLines={2}>Registrarse</Text>
                <Formik
                        initialValues={{ email: '', password: '', curp: '', name: '', lastName:''}}
                        validationSchema={loginValidationSchema}
                        onSubmit={async values => {
                            await fetch(proxy+'/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': "*"
                                },
                                body: JSON.stringify(values)
                            }).then(res => res.json()).then(res => callback(res))
                            navigation.navigate('Home')
                        }}>

                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                            <>
                                
                                    <TextInput
                                        label="Nombre(s)"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        // Only numbers and 14 characters
                                        variant="outlined"
                                        style={{paddingTop:20}}
                                        leading={props => <Icon name="account" {...props} />}
                                        color="#fc049c"
                                    />
                                    {errors.name && 
                                        <Text style={{fontSize:15, fontWeight:"200", color:'red'}}>{errors.name}</Text>
                                    }

                                    <TextInput
                                        label="Apellidos"
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                        // Only numbers and 14 characters
                                        variant="outlined"
                                        style={{paddingTop:20}}
                                        leading={props => <Icon name="account" {...props} />}
                                        color="#fc049c"
                                    />  
                                    {errors.lastName && 
                                        <Text style={{fontSize:15, fontWeight:"200", color:'red'}}>{errors.lastName}</Text>
                                    }

                                    <TextInput
                                        label="Email"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        // Only numbers and 14 characters
                                        variant="outlined"
                                        style={{paddingTop:20}}
                                        leading={props => <Entypo name="email" size={24} color="black" {...props}/>}
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
                                    <TextInput
                                        label="CURP"
                                        onChangeText={handleChange('curp')}
                                        onBlur={handleBlur('curp')}
                                        value={values.curp}
                                        // Only numbers and 14 characters
                                        variant="outlined"
                                        style={{paddingTop:20}}
                                        color="#fc049c"
                                        leading={props => <AntDesign name="idcard" size={24} color="black" {...props} />}
                                    />
                                    {errors.curp && 
                                        <Text style={{fontSize:15, fontWeight:"200", color:'red'}}>{errors.curp}</Text>
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

