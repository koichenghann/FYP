import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
    },
    {
			title: 'Users', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/users/list-user', title: 'User List', type: 'link' },
				{ path: '/users/create-user', title: 'Create User', type: 'link' },
			]
    },
    {
		title: 'Campaigns', icon: 'calendar', type: 'sub', active: false, children: [
			{ path: '/media/list-campaign', title: 'Campaign List', type: 'link' },
			{ path: '/media/create-campaign', title: 'Create Campaign', type: 'link' },
		]
		},
		{
			title: 'Category', icon: 'box', type: 'sub', active: false, children: [
						{ path: '/products/digital/digital-category', title: 'Category List', type: 'link' },
			]
		},
    {
			title: 'Orders', icon: 'clipboard', type: 'sub', active: true, children: [
        { path: '/sales/orders', title: 'Order List', type: 'link' },
        { path: '/sales/transactions', title: 'Transactions', type: 'link' },
			]
    },
		{
			title: 'Settings', icon: 'settings', type: 'sub', children: [
				{ path: '/settings/profile', title: 'Profile', type: 'link' },
			]
		},
		{
			title: 'Log Out',path: '/auth/login', icon: 'log-out', type: 'link', active: false
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
