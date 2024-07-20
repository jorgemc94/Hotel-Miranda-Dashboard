
export interface User {
    id: number,
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
    id: number;
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
