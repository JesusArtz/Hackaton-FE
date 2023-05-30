import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useSession() {

    const [session, setSession] = useState({
        token: '',
    })

    
    useEffect(() => {

        AsyncStorage.getItem('SessionInfo')
            .then(res => setSession(res ? JSON.parse(res) : session))

    }, [])

    useEffect(() => {

        AsyncStorage.setItem('SessionInfo', JSON.stringify(session))


    }, [session])

    return [session, setSession];

}