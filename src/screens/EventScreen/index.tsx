import React, { FC, useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { EventScreenProps } from '../../routes/types';
import { getDateMonth } from '../../constants';

const EventScreen: FC<EventScreenProps> = ({ navigation }) => {
    const [eventList, setEventList] = useState([
        {
            id: '1', name: 'Bell Witch',
            image: require('../../assets/images/1.png'),
            data: '2023-09-25', location: 'The Park Theatre', price: '$35.00'
        },
        {
            id: '2', name: 'Ten Foot Pole',
            image: require('../../assets/images/2.png'),
            data: '2023-09-26', location: 'The Park Theatre', price: '$25.16'
        },
        {
            id: '3', name: 'Great Lake Swimmers',
            image: require('../../assets/images/3.png'),
            data: '2023-09-29', location: 'The Park Theatre', price: '$22.50'
        },
        {
            id: '4', name: 'Good Riddance & Choke',
            image: require('../../assets/images/4.png'),
            data: '2023-09-30', location: 'The Park Theatre', price: '$35.96'
        },
        {
            id: '5', name: 'Protest the Hero',
            image: require('../../assets/images/5.png'),
            data: '2023-10-06', location: 'The Park Theatre', price: '$25.16'
        },
    ])

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 18 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>Upcoming Events</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: '20%' }} showsVerticalScrollIndicator={false}>
                {eventList.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('Booking', { eventId: item.id, eventName: item.name })}
                        style={styles.eventSection}
                    >
                        <Image source={item.image} style={styles.eventImageStyle} />
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateStyle}>{getDateMonth(item.data)}</Text>
                        </View>
                        <View style={styles.bottomSection}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.eventText, { fontSize: 18 }]}>{item.name}</Text>
                                <Text style={[styles.eventText, { fontSize: 16 }]}>{item.location}</Text>
                            </View>
                            <View style={styles.eventPriceContainer}>
                                <Text style={styles.eventPriceText}>{item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
        </View>
    );
}

export default EventScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262B4F',
        paddingHorizontal: 24
    },
    eventSection: {
        width: '100%',
        height: 200,
        marginBottom: 20
    },
    eventImageStyle: {
        resizeMode: 'cover',
        width: '100%',
        height: 200,
        borderRadius: 18,
    },
    bottomSection: {
        height: 70,
        width: '100%',
        backgroundColor: 'rgba(122, 66, 244, 0.7)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        paddingHorizontal: 18,
        alignItems: 'center'
    },
    eventText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    eventPriceText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    eventPriceContainer: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 5,
        borderRadius: 15,
        width: '20%'
    },
    dateStyle: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 4,
    },
    dateContainer: {
        position: 'absolute',
        top: 10,
        right: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: '18%'
    }
});