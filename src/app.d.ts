declare global {
    namespace App {
        interface Locals {
            user: {
                id: number;
                admin: boolean;
            } | null;
        }
    }
}

export {}; 