import {inject, Injectable, InjectionToken} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {MediaMatcher} from "@angular/cdk/layout";
import {BehaviorSubject} from "rxjs";


export const COLOR_MODE_KEY = 'color-mode';

export const enum ColorMode {
  Dark = 'dark',
  Light = 'light'
}

export const DEFAULT_COLOR_MODE_ATTR_NAME = 'data-color-mode';

export const COLOR_MODE_ATTR_NAME_TOKEN = new InjectionToken<string>('COLOR_MODE_ATTR_NAME_TOKEN', {
  providedIn: 'root',
  factory: () => DEFAULT_COLOR_MODE_ATTR_NAME
})


@Injectable({
  providedIn: 'root'
})
export class ColorModeSwitchService {

  readonly #document = inject(DOCUMENT);
  readonly #media = inject(MediaMatcher);
  readonly #attrName = inject(COLOR_MODE_ATTR_NAME_TOKEN);

  readonly #colorSchemeQuery: MediaQueryList;
  readonly #currentMode= new BehaviorSubject<ColorMode>(ColorMode.Light);

  readonly currentMode$ = this.#currentMode.asObservable();

  get attrName(): string {
    return this.#attrName;
  }

  get currentMode(): ColorMode {
    return this.#currentMode.value
  }

  constructor() {
    this.#colorSchemeQuery = this.#media.matchMedia('(prefers-color-scheme: dark)');
    this.#colorSchemeQuery.addEventListener('change', (value) => {

      if(!!this.#getLocalMode()) {
        return;
      }

      this.#setMode(value.matches ? ColorMode.Dark : ColorMode.Light, false);
    });

    this.#setInitialMode();
  }

  toggleMode() {
    this.#toggleMode();
  }

  #setInitialMode() {
    let mode = this.#getLocalMode();

    if(!mode) {
      mode = this.#colorSchemeQuery.matches ? ColorMode.Dark : ColorMode.Light;
    }

    this.#setMode(mode, false);
  }

  #toggleMode() {

    this.#setMode(
      this.#isInDarkMode() ? ColorMode.Light : ColorMode.Dark
    );
  }

  #isInDarkMode() {
    const local = this.#getLocalMode();

    if(local) {
      return local === ColorMode.Dark;
    }

    return this.#colorSchemeQuery.matches;
  }

  #setMode(mode: ColorMode, store: boolean = true) {

    if (store) {
      this.#setLocalMode(mode);
    }

    if (mode === ColorMode.Dark) {
      this.#document.body.setAttribute(this.#attrName,'dark');
    } else {
      this.#document.body.setAttribute(this.#attrName,'light');
    }

    this.#currentMode.next(mode);
  }

  #getLocalMode(): ColorMode | null {

    const mode = localStorage.getItem(COLOR_MODE_KEY);

    return !mode ? null : mode as ColorMode;
  }

  #setLocalMode(value: ColorMode) {
    localStorage.setItem(COLOR_MODE_KEY, value);
  }
}
