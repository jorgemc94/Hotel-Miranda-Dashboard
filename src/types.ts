
export interface User {
    _id?: string,
    name: string,
    email: string,
    phone: string,
    photo: string,
    position: {
        name: "Manager" | "Room service" | "Reception",
        description:string
    },
    date: string,
    status: "valid" | "invalid" | "",
    password: string
}


export interface Room {
    _id?: string;
    roomNumber: number;
    availability: "available" | "booked";
    roomType: "Double Superior";
    description: string;
    offer: boolean;
    price: number;
    discount: number;
    cancellation: string;
    amenities: string[];
    photosArray: string[];
}


export interface Booking {
    fullName: string,
    _id?: string,
    bookDate: string,
    checkIn: string,
    checkOut: string,
    specialRequest: string,
    roomId: number,
    status: "In progress" | "Check In" | "Check Out"
}

export interface Contact {
    date: string,
    client: {
        name: string,
        email: string,
        phone: string,
        image: string,
    },
    _id?: string,
    subject: string,
    comment: string,
    archived: "false" | "true"
}