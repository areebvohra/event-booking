import React, { FC, useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { EventScreenProps } from '../../routes/types';

const EventScreen: FC<EventScreenProps> = ({ navigation }) => {
    const [eventList, setEventList] = useState([
        { name: 'event name', data: 'even data', location: '', price: '' },
        { name: 'event name', data: 'even data', location: '', price: '' },
        { name: 'event name', data: 'even data', location: '', price: '' },
        { name: 'event name', data: 'even data', location: '', price: '' },
        { name: 'event name', data: 'even data', location: '', price: '' },
    ])

    return (
        <View style={{ backgroundColor: '#262B4F' }}>
            <View style={{ paddingBottom: 18, paddingHorizontal: 25, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>Upcoming Events</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: '20%' }} showsVerticalScrollIndicator={false}>
                {eventList.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('Booking', { eventId: 'eventId-1', eventName: 'eventName-1' })}
                        style={styles.eventSection}
                    >
                        <Image source={require('../../assets/images/event-1.jpg')} style={styles.eventImageStyle} />
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateStyle}>11{"\n"}Dec</Text>
                        </View>
                        <View style={styles.bottomSection}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.eventText, { fontSize: 18 }]}>Event Name</Text>
                                <Text style={[styles.eventText, { fontSize: 16 }]}>Location</Text>
                            </View>
                            <View style={styles.eventPriceContainer}>
                                <Text style={styles.eventPriceText}>$45</Text>
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
        opacity: 0.6
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
        fontSize: 18,
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