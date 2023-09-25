import React, { FC, useEffect } from 'react';
import { Text, View, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { ConfirmationScreenProps } from '../../routes/types';

const ConfirmationScreen: FC<ConfirmationScreenProps> = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
            headerBackVisible: false
        })

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => { return true; },
        );

        return () => backHandler.remove();
    }, [])

    return (
        <View style={styles.container}>
            <Text>ConfirmationScreen</Text>

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
        paddingHorizontal: 24
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
