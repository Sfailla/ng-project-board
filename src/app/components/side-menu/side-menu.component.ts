import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  template: ` <div class="side-menu"></div> `,
  styles: [
    `
      .side-menu {
        width: 18rem;
        height: 100%;
        background-color: #ffffff;
        border-right: 1px solid #e5e5e5;
      }
    `,
  ],
})
export class SideMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
