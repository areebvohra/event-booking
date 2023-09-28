const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDateMonth = (value: string) => {
    const date = new Date(value);
    let month = months[date.getMonth()];
    return `${date.getDate()}\n${month}`
}

export interface Event {
    id: string;
    name: string;
    date: string;
    image: string;
    location: string;
    price: string
}

export const baseURL = 'http://localhost:3000';