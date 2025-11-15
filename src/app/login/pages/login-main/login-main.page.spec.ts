import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMainPage } from './login-main.page';

describe('LoginMainPage', () => {
  let component: LoginMainPage;
  let fixture: ComponentFixture<LoginMainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMainPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
