import { useState } from "react";
import { Text, Alert, ImageBackground, PlatformColor, StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser, signUpUser } from "../firebase/FirebaseAuthController";
import { NavigationContainer } from "@react-navigation/native";

const buttons = [
    {value: false, label: 'Login'},
    {value: true, label: 'Register'}
]

export default function Login(){
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');
    const [register, setRegister] = useState(false);
    const [error, setError] = useState();
    
    async function signAction(){
        if(register){
            let e = await signUpUser(email, pw, nickname);
            setError(e);
        }else{
            let e = await loginUser(email, pw);
            setError(e);
        }
    }

    if(error){
        Alert.alert(error);
        setError(null);
    }

    return(
        <SafeAreaView style={Styles.loginView}>
            <SegmentedButtons
                value={register}
                onValueChange={setRegister}
                buttons={buttons}
                style={Styles.SegmentedButtons}
                theme={{ colors: { onSurface: 'white', onPrimaryContainer: 'black' } }}
            />
            { register &&
                <TextInput
                    value={nickname}
                    onChangeText={setNickname}
                    label={'Username'}
                    left={<TextInput.Icon icon={'account'}/>}
                />
            }   
            <TextInput
                value={email}
                onChangeText={setEmail}
                label={'Email'}
                left={<TextInput.Icon icon={'email'}/>}
            />
            <TextInput
                value={pw}
                onChangeText={setPw}
                label={'Password'}
                left={<TextInput.Icon icon={'lock'}/>}
                secureTextEntry={true}
            />
            <Button mode='contained' onPress={signAction} style={Styles.loginbutton}>
               { register ? 'Register' : 'Login'}
            </Button>
            <Text style={Styles.pelleilyteksti}>Created by Nico Lust B)</Text>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    loginView:{
        backgroundColor: '#343131',
        gap: 10,
        padding: 10,
        height: '100%',
        
    },

    loginbutton:{
        backgroundColor: '#A04747',
        textShadowColor: 'black',
    },

    SegmentedButtons:{
        marginTop: '10%',
    },

    pelleilyteksti:{
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    }

})