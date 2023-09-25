import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EventScreen from '../screens/EventScreen';
import BookingScreen from '../screens/BookingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import { RootStackParamList } from './types';

interface AppStackProps { }

const Stack = createStackNavigator<RootStackParamList>();

const AppStack: FC<AppStackProps> = ({ }) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#262B4F', elevation: 0, shadowOpacity: 0 },
                headerTitleStyle: { color: '#FFFFFF', fontSize: 20 },
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF'
            }}
        >
            <Stack.Screen name="Events" component={EventScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;
