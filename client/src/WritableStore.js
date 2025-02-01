import { writable } from 'svelte/store';

export const auctionEnded = writable(false);
export const currentPrice = writable(null);