export interface ErrorType extends Error {
    code: number;
    status: string;
    message: string;
    timestamp: string;
}