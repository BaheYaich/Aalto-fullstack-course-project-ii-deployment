import type { User } from '$lib/types';


interface Locals {
    user?: User | null;
}

export async function load({ locals }: { locals: Locals }) {
    return {
        user: locals.user || null
    };
}