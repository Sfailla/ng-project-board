import { Component } from '@angular/core'

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  template: `
    <span class="logo"></span>
    <span class="logo-inner"></span>
  `,
  styles: [
    `
      @use '../../../styles/abstracts' as *;

      .logo {
        width: rem(25px);
        height: rem(25px);
        position: relative;
        display: block;
        @include flex();
        background-color: var(--ion-color-danger);
        -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

        &::before {
          content: '';
          display: block;
          height: rem(22px);
          width: rem(22px);
          background-color: white;
          -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        &::after {
          content: '';
          width: rem(15px);
          height: rem(15px);
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--ion-color-danger);
          -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      }

      .logo-inner {
        width: rem(12px);
        height: rem(12px);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        background-color: #ffffff;
        -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

        &::after {
          content: '';
          width: rem(5px);
          height: rem(5px);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          background-color: var(--ion-color-danger);
          -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      }
    `
  ]
})
export class LogoComponent {}
