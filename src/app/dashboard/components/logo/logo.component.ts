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
      @import '../../../styles/abstracts';

      .logo {
        width: 2.5rem;
        height: 2.5rem;
        position: relative;
        display: block;
        @include flex();
        background-color: var(--ion-color-danger);
        -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

        &::before {
          content: '';
          display: block;
          height: 2.2rem;
          width: 2.2rem;
          background-color: white;
          -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        &::after {
          content: '';
          width: 1.5rem;
          height: 1.5rem;
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
        width: 1.2rem;
        height: 1.2rem;
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
          width: 0.5rem;
          height: 0.5rem;
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
