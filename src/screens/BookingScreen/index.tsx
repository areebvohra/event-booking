import React, { FC, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { ResultSet, SQLError, Transaction, openDatabase, } from 'react-native-sqlite-storage';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { BookingScreenProps } from '../../routes/types';
import { baseURL } from '../../constants';

const db: any = openDatabase({
    name: 'bookings'
})

const BookingScreen: FC<BookingScreenProps> = ({ route, navigation }) => {
    const { eventId, eventName } = route.params;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [ticketsCount, setTicketsCount] = useState(0);
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

        if (!emailValid || !usernameValid || !ticketValid) {
            return;
        }

        senddata();
        // addBooking();
    }

    const addBooking = () => {
        db.transaction((txn: Transaction) => {
            txn.executeSql(
                `INSERT INTO bookings (username, email, tickets, eventId) VALUES (?,?,?,?)`,
                [username, email, ticketsCount, eventId],
                (txn: Transaction, res: ResultSet) => {
                    console.log('booking added successfully');
                    getBooking();
                    navigation.navigate('Confirmation', { email, bookingId: res.insertId.toString() });
                },
                (transaction: any, error: SQLError) => {
                    Alert.alert('Execution error', transaction.message);
                    console.log("error on adding booking", error.message);
                },
            );
        });
    };

    const getBooking = () => {
        db.transaction((txn: Transaction) => {
            txn.executeSql(
                `SELECT * FROM bookings ORDER BY id DESC`, [],
                (sqlTxn: Transaction, res: ResultSet) => {
                    let len = res.rows.length;

                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ ...item });
                        }

                        console.log('====================================');
                        console.log('get booking ===', results);
                        console.log('====================================');
                    } else {
                        console.log('bookings table empty');
                    }
                },
                (transaction: Transaction, error: SQLError) => {
                    console.log("error on getting bookings", error.message);
                },
            );
        });
    };

    const senddata = () => {
        const url = `${baseURL}/booking`;
        const params = {
            "event_name": eventName,
            "username": username,
            "email": email,
            "no_of_tickets": ticketsCount,
            "eventId": eventId,
        }

        axios.post(url, params)
            .then(async (response: AxiosResponse) => {
                console.log('====================================');
                console.log(response.data.message);
                console.log('====================================');
            }).catch(async (error: AxiosError | any) => {
                console.log('====================================');
                console.log(error.message);
                console.log('====================================');
            });
    }

    // const deleteAllBookings = () => {
    //     db.transaction((txn: Transaction) => {
    //         txn.executeSql(
    //             `DELETE FROM bookings`, [],
    //             () => {
    //                 console.log('bookings deleted successfully');
    //                 getBooking();
    //             },
    //             () => { },
    //         );
    //     });
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Event name</Text>
            <TextInput
                style={[styles.input, { color: '#FFFFFF', borderColor: '#7a42f4' }]}
                underlineColorAndroid="transparent"
                value={eventName}
                editable={false}
            />

            <Text style={styles.label}>Enter your username</Text>
            <TextInput
                style={[styles.input, { borderColor: usernameError.length > 0 ? 'red' : '#7a42f4' }]}
                underlineColorAndroid="transparent"
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={value => setUsername(value)}
                defaultValue={username}
            />
            {usernameError.length > 0 && <Text style={{ color: '#FFFFFF' }}>{usernameError}</Text>}

            <Text style={styles.label}>Enter your email</Text>
            <TextInput
                style={[styles.input, { borderColor: emailError.length > 0 ? 'red' : '#7a42f4' }]}
                underlineColorAndroid="transparent"
                placeholder="Email"
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
        marginVertical: 5,
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
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    label: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10
    }
});