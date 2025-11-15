import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
  signal,
} from '@angular/core';

import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { MatIconModule } from '@angular/material/icon';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextComponent } from '../../components/input-text.component/input-text.component';
import { InputPasswordComponent } from '../../components/input-password.component/input-password.component';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule, InputPasswordComponent, InputTextComponent],
  standalone: true,
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<SwiperContainer>;

  images = ['/bg-1.png', '/bg-2.png', '/bg-3.png', '/bg-4.png'];
  currentIndex = signal(0);

  constructor() {}

  async ngAfterViewInit() {
    const swiperEl = this.swiperContainer?.nativeElement;

    if (swiperEl && swiperEl.children.length > 0) {
      const swiperParams: SwiperOptions = {
        loop: true,
        slidesPerView: 1,
        effect: 'slide',
        speed: 1000,
        autoplay: {
          delay: 4000,
        },
      };

      Object.assign(swiperEl, swiperParams);

      await swiperEl.initialize();

      swiperEl.swiper.autoplay.start();

      const shadow = (swiperEl as any).shadowRoot;
      if (shadow) {
        const defaultNavButtons = shadow.querySelectorAll(
          '.swiper-button-next, .swiper-button-prev'
        );
        defaultNavButtons.forEach((btn: Element) => btn.remove());
      }

      const prevBtn = document.querySelector('#prevBtn');
      const nextBtn = document.querySelector('#nextBtn');

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => swiperEl.swiper.slidePrev());
        nextBtn.addEventListener('click', () => swiperEl.swiper.slideNext());
      }

      swiperEl.swiper.on('slideChange', () => {
        this.currentIndex.set(swiperEl.swiper.realIndex);
      });
    }
  }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
    ]),
  });
}
