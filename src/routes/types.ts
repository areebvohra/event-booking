import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Events: undefined;
    Booking: { eventId: string, eventName: string };
    Confirmation: undefined;
};

export type BookingScreenProps = NativeStackScreenProps<RootStackParamList, 'Booking'>;
export type EventScreenProps = NativeStackScreenProps<RootStackParamList, 'Events'>;
export type ConfirmationScreenProps = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;