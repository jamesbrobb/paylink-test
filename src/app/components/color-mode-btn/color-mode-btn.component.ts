import {map} from "rxjs";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ColorMode, ColorModeSwitchService} from "../../services/color-mode-switch.service";


@Component({
  selector: 'color-mode-btn',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon
  ],
  templateUrl: './color-mode-btn.component.html',
  styleUrl: './color-mode-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorModeBtnComponent {

  readonly #colorModeSwitchService = inject(ColorModeSwitchService);

  readonly darkMode$ = this.#colorModeSwitchService.currentMode$.pipe(
    map(mode => mode === ColorMode.Dark)
  );

  toggleDarkMode() {
    this.#colorModeSwitchService.toggleMode();
  }
}
