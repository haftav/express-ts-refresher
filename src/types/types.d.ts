declare namespace Express {
    export interface Request {
        userData?: {
            id: number
        };
    }
 }

declare module 'async/eachSeries';
