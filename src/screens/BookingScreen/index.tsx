import React, { FC, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

import { BookingScreenProps } from '../../routes/types';

const BookingScreen: FC<BookingScreenProps> = ({ route, navigation }) => {
    const { eventId, eventName } = route.params;

    const [ticketsCount, setTicketsCount] = useState(0);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [ticketError, setTicketError] = useState('');

    const increment = () => {
        if (ticketsCount - 1 <= 0 || ticketsCount < 10) {
            setTicketsCount(ticketsCount + 1)
        }
    }

    const decrement = () => {
        if (ticketsCount + 1 >= 10 || ticketsCount > 0) {
            setTicketsCount(ticketsCount - 1)
        }
    }

    const handleSubmit = () => {
        let emailValid = false;
        if (!email)
            setEmailError('Email required');
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
            setEmailError('Invalid email address');
        else
            setEmailError(''), emailValid = true;

        let usernameValid = false;
        if (!username)
            setUsernameError('Username Required');
        else if (username.length < 6)
            setUsernameError('Username should be more then 5 character');
        else
            setUsernameError(''), usernameValid = true

        let ticketValid = false;
        if (ticketsCount == 0)
            setTicketError('Ticket can\'t be less then 1')
        else
            setTicketError(''), ticketValid = true

        // if (!emailValid || !usernameValid || !ticketValid) {
        //     return;
        // }

        navigation.navigate('Confirmation');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { color: '#FFFFFF', borderColor: '#7a42f4' }]}
                underlineColorAndroid="transparent"
                value={eventName}
                editable={false}
            />
            <TextInput
                style={[styles.input, { borderColor: usernameError.length > 0 ? 'red' : '#7a42f4' }]}
                underlineColorAndroid="transparent"
                placeholder="Username"
                placeholderTextColor="#FFFFFF"
                autoCapitalize="none"
                onChangeText={value => setUsername(value)}
                defaultValue={username}
            />
            {usernameError.length > 0 && <Text style={{ color: '#FFFFFF' }}>{usernameError}</Text>}

            <TextInput
                style={[styles.input, { borderColor: emailError.length > 0 ? 'red' : '#7a42f4' }]}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#FFFFFF"
                autoCapitalize="none"
                onChangeText={value => setEmail(value)}
                defaultValue={email}
            />
            {emailError.length > 0 && <Text style={{ color: '#FFFFFF' }}>{emailError}</Text>}

            <View style={{ marginVertical: 15, alignItems: 'center' }}>
                <View style={styles.plusMinusContainer}>
                    <TouchableOpacity onPress={decrement} style={[styles.plusMinusBtn, styles.plusMinusLeftBtn]}>
                        <Image source={require('../../assets/icons/minus.png')} style={styles.plusMinusImage} />
                    </TouchableOpacity>
                    <View style={styles.viewTextInput}>
                        <Text style={styles.plusMinusText}
                        >{ticketsCount}</Text>
                    </View>
                    <TouchableOpacity onPress={increment} style={[styles.plusMinusBtn, styles.plusMinusRightBtn]}>
                        <Image source={require('../../assets/icons/plus.png')} style={styles.plusMinusImage} />
                    </TouchableOpacity>
                </View>
                {ticketError.length > 0 && <Text style={{ color: '#FFFFFF' }}>{ticketError}</Text>}
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    );
}

export default BookingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#262B4F',
        paddingHorizontal: 24
    },
    input: {
        marginBottom: 5,
        marginTop: 10,
        paddingLeft: 10,
        height: 50,
        borderWidth: 1.5,
        borderRadius: 5,
        fontSize: 17
    },
    plusMinusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    plusMinusBtn: {
        padding: 18,
        backgroundColor: '#7a42f4',
    },
    plusMinusLeftBtn: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    plusMinusRightBtn: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    plusMinusImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: '#FFFFFF'
    },
    viewTextInput: {
        backgroundColor: '#FFFFFF',
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusMinusText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    submitBtn: {
        backgroundColor: '#7a42f4',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
});