import { writable } from 'svelte/store';

export const sideBarOpen = writable<boolean>(false);
export const modalIncomeOpen = writable<boolean>(false);
export const modalExpenseOpen = writable<boolean>(false);
