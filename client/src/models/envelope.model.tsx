export interface Envelope<T> {
    success: boolean;
    message: string;
    data: T | null; 
}