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

export default function App() {

    const Stack = createNativeStackNavigator();

    const [session, setSession] = useSession();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main">
                    {props => <Main {...props} session={session} setSession={setSession} />}
                </Stack.Screen>
                <Stack.Screen name="Login">
                    {props => <Login {...props} callback={setSession} />}
                </Stack.Screen>
                <Stack.Screen name="Register">
                    {props => <Register {...props} callback={setSession}/>}
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
            </Stack.Navigator>
        </NavigationContainer>
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