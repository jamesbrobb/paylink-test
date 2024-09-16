import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModeBtnComponent } from './color-mode-btn.component';
import {ColorModeSwitchService} from "../../services/color-mode-switch.service";


export class MockColorModeSwitchService {
  toggleMode() {}
}



describe.only('DarkModeBtnComponent', () => {
  let component: ColorModeBtnComponent;
  let fixture: ComponentFixture<ColorModeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorModeBtnComponent],
      providers: [{
        provide: ColorModeSwitchService,
        useClass: MockColorModeSwitchService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorModeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //it('should show')
});
