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

@Component({
  selector: 'app-background',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BackgroundComponent implements AfterViewInit {
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
}
