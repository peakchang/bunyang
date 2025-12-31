import { writable } from 'svelte/store';

export let admin_sidebar = writable(false);
export let admin_sidebar_width = writable(false);

export const user_info = writable({ id: '', name: '' })

export let toast = writable({ show: false, text: '토스트 메세지' });