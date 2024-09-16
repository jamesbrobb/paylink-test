import {BehaviorSubject} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatIconTestingModule} from "@angular/material/icon/testing";
import { ColorModeBtnComponent } from './color-mode-btn.component';
import {ColorMode, ColorModeSwitchService} from "../../services/color-mode-switch.service";

import spyOn = jest.spyOn;


export class MockColorModeSwitchService {
  readonly #currentMode = new BehaviorSubject(ColorMode.Light);
  currentMode$ = this.#currentMode.asObservable();
  toggleMode() {}
}



describe.only('ColorModeBtnComponent', () => {
  let component: ColorModeBtnComponent;
  let fixture: ComponentFixture<ColorModeBtnComponent>;
  let service: MockColorModeSwitchService;

  beforeEach(async () => {

    service = new MockColorModeSwitchService();

    await TestBed.configureTestingModule({
      imports: [
        MatIconTestingModule,
        ColorModeBtnComponent
      ],
      providers: [{
        provide: ColorModeSwitchService,
        useValue: service
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

  it('should show toggle service', () => {
      const spy = spyOn(service, 'toggleMode');
      component.toggleDarkMode();
      expect(spy).toHaveBeenCalled();
  })
});
