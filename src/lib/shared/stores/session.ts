import { writable } from 'svelte/store';
import type { User, Session } from '@supabase/supabase-js';

export const session = writable<Session | null>(null);
export const user = writable<User | null>(null);

export function setSession(newSession: Session | null) {
	session.set(newSession);
	user.set(newSession?.user ?? null);
}

export function clearSession() {
	session.set(null);
	user.set(null);
}
