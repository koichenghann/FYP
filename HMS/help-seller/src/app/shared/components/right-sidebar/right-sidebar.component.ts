import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor() { }

  public users = [
    {
      img: "assets/images/dashboard/user.png",
      name: "Siw Wen Ying",
      status: "Online"
    },
    {
      img: "assets/images/dashboard/user1.jpg",
      name: "Lee Keat Hong",
      status: "28 minutes ago"
    },
    {
      img: "assets/images/dashboard/user2.jpg",
      name: "Choo Jia Long",
      status: "Online"
    },
    {
      img: "assets/images/dashboard/user3.jpg",
      name: "Ch'ng Jian Lun",
      status: "Online"
    },
    {
      img: "assets/images/dashboard/man.png",
      name: "Kam Yik Wah",
      status: "2 minutes ago"
    },
    {
      img: "assets/images/dashboard/user5.jpg",
      name: "Han Vui Ern",
      status: "2 hour ago"
    },
    {
      img: "assets/images/dashboard/designer.jpg",
      name: "Liew Cai Juan",
      status: "Online"
    }
  ]

  ngOnInit() { }

}
