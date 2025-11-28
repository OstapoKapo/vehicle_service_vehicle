export interface Vehicle {
    id: string;
    userId: string;
    model: string | null;
    make: string | null;
    year: number | null;
    createdAt: Date;
    updatedAt: Date;
}