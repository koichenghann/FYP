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
			title: 'Orders', icon: 'clipboard', type: 'sub', active: true, children: [
				{ path: '/sales/orders', title: 'My Orders', type: 'link' },
			]
    },
    {
			title: 'Shipment', icon: 'archive', type: 'sub', active: false, children: [
        { path: '/menus/list-menu', title: 'My Shipment', type: 'link' },
        { path: '/products/physical/category', title: 'Add Shipping Method', type: 'link' },
			]
		},
		{
			title: 'Product', icon: 'box', type: 'sub', active: false, children: [
						{ path: '/products/digital/digital-product-list', title: 'My Products', type: 'link' },
						{ path: '/products/digital/digital-add-product', title: 'Add New Product', type: 'link' },
			]
		},
		{
			title: 'Coupons', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/coupons/list-coupons', title: 'My Coupons', type: 'link' },
				{ path: '/coupons/create-coupons', title: 'Create Coupon', type: 'link' },
			]
    },
    {
      title: 'Finance', icon: 'dollar-sign', type: 'sub', active: false, children: [
        { path: '/reports', title: 'My Income', type: 'link' },
        { path: '/sales/transactions', title: 'Transactions', type: 'link' },
        { path: '/invoice', title: 'Invoice', type: 'link' },
        { path: '/pages/list-page', title: 'Bank Accounts', type: 'link' },
        { path: '/pages/create-page', title: 'Add Bank Account', type: 'link' },
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
