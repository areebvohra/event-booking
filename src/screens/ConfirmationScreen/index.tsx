import React, { FC, useEffect } from 'react';
import { Text, View, StyleSheet, BackHandler, TouchableOpacity, Image } from 'react-native';
import { ConfirmationScreenProps } from '../../routes/types';

const ConfirmationScreen: FC<ConfirmationScreenProps> = ({ route, navigation }) => {
    const { email, bookingId } = route.params;

    useEffect(() => {
        navigation.setOptions({ headerShown: false })

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => { return true; },
        );

        return () => backHandler.remove();
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', paddingBottom: 18 }}>
                <Image source={require('../../assets/icons/confirm.png')} style={{ resizeMode: 'contain', tintColor: '#7a42f4', marginVertical: 10 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginBottom: 40 }}>Booking confirmed</Text>
                <Text style={styles.normalText}>Your booking number is <Text style={{ fontWeight: 'bold' }}>{bookingId}</Text></Text>
                <Text style={[styles.normalText, { fontSize: 18 }]}>Your confirmation email has been sent to{'\n'}<Text style={{ fontWeight: 'bold' }}>{email}</Text></Text>
                <Text style={[styles.normalText, {}]}>For more information, please{'\n'}call us at <Text style={{ fontWeight: 'bold' }}>+971-524553421</Text></Text>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('Events')}>
                <Text style={styles.submitBtnText}>Return to Events</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#262B4F',
        paddingHorizontal: 24,
        paddingTop: 50,
        justifyContent: 'center'
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
    },
    normalText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40
    }
});
