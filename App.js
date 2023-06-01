import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import useSession from './source/hooks/useSession';
import Main from './source/screens/main';
import Login from './source/screens/Auth/login';
import Register from './source/screens/Auth/register';
import Home from './source/screens/home';
import Profile from './source/screens/profile';
import Charts from './source/screens/charts';
import Transfer from './source/screens/tranfer';
import Deposit from './source/screens/deposit';
import Successful from './source/screens/Payment/successful';
import Unsuccessful from './source/screens/Payment/unsuccessful';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {

    const Stack = createNativeStackNavigator();

    const [session, setSession] = useSession();

    return (
        <StripeProvider publishableKey='pk_test_51JZbuNCVJQzDKTXlaVnI4FDv6yTepZIuUkYHhXQdTIdtAgCUm2vuYFsdOnoJkzHtDsaZxp8wdwPNwisnddYQyKee00DXzEYjiZ' merchantIdentifier='merchant.com.boostmycash' urlScheme='boostmycash'>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Main">
                        {props => <Main {...props} session={session} setSession={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Login">
                        {props => <Login {...props} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register">
                        {props => <Register {...props} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Home">
                        {props => <Home {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Charts">
                        {props => <Charts {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Profile">
                        {props => <Profile {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Transfer">
                        {props => <Transfer {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Deposit">
                        {props => <Deposit {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Successful">
                        {props => <Successful {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                    <Stack.Screen name="Unsuccessful">
                        {props => <Unsuccessful {...props} session={session} callback={setSession} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});