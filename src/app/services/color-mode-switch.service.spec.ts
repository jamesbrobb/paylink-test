import { TestBed } from '@angular/core/testing';
import {
  COLOR_MODE_KEY,
  ColorMode,
  ColorModeSwitchService,
  DEFAULT_COLOR_MODE_ATTR_NAME
} from "./color-mode-switch.service";
import {MediaMatcher} from "@angular/cdk/layout";
import DoneCallback = jest.DoneCallback;


export class MediaMatcherMock {
  #query: QueryMock;
  constructor(query: QueryMock) {
    this.#query = query;
  }
  matchMedia() {
    return this.#query;
  }
}

export class QueryMock {
  #matches?: ColorMode;
  #cb?: Function;

  get matches() {
    return this.#matches;
  }

  constructor(matches?: ColorMode) {
    this.#matches = matches;
  }

  addEventListener(type: string, cb: Function) {
    this.#cb = cb;
  }

  triggerCb(mode: {matches: ColorMode | null}) {
    this.#cb?.(mode);
  }
}


function initialiseTest(initialMode?: ColorMode, onQuery: boolean = false, attrName?: string) {

  let query = new QueryMock();

  attrName = attrName ? attrName : COLOR_MODE_KEY;

  if(initialMode) {
    if(onQuery) {
      query = new QueryMock(initialMode);
    } else {
      window.localStorage.setItem(attrName, initialMode);
    }
  }

  TestBed.configureTestingModule({
    providers: [
      ColorModeSwitchService,
      {
        provide: MediaMatcher,
        useFactory: () => new MediaMatcherMock(query)
      }
    ]
  });

  return {
    service: TestBed.inject(ColorModeSwitchService),
    query
  }
}


describe('ColorModeSwitchService', () => {
  let service: ColorModeSwitchService;
  let query: QueryMock;

  afterEach(() => {
    document.body.removeAttribute(service.attrName);
    window.localStorage.clear();
  });

  describe('without initial local storage value', () => {
    beforeEach(() => {
      ({service, query} = initialiseTest());
    });

    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should use default attribute name if none supplied', () => {
      expect(service.attrName).toBe(DEFAULT_COLOR_MODE_ATTR_NAME);
    });

    it('should set initial mode to light', () => {
      expect(service.currentMode).toBe(ColorMode.Light);
      expect(document.body.getAttribute(service.attrName)).toBe(ColorMode.Light);
    });

    it('should not set value in local storage on initialisation', () => {
      expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBeNull();
    });

    it('should toggle color mode', (done: DoneCallback) => {
      expect(service.currentMode).toBe(ColorMode.Light);

      service.currentMode$.subscribe((mode) => {
        expect(mode).toBe(ColorMode.Dark);
        expect(document.body.getAttribute(service.attrName)).toBe(ColorMode.Dark);
        expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBe(ColorMode.Dark);
        done();
      });

      service.toggleMode();
    });

    it('should update mode when system mode value changes', (done: DoneCallback) => {
      expect(service.currentMode).toBe(ColorMode.Light);

      service.currentMode$.subscribe((mode) => {
        expect(mode).toBe(ColorMode.Dark);
        expect(document.body.getAttribute(service.attrName)).toBe(ColorMode.Dark);
        expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBeNull();
        done();
      });

      query.triggerCb({
        matches: ColorMode.Dark
      });
    });

    it('should not change color mode if a local value is set and the system mode changes', () => {
      window.localStorage.setItem(COLOR_MODE_KEY, ColorMode.Dark);

      service.currentMode$.subscribe(() => {
        fail();
      });

      query.triggerCb({
        matches: ColorMode.Dark
      });
    });
  })

  describe('with initial local storage value', () => {

    beforeEach(() => {
      ({service, query} = initialiseTest(ColorMode.Dark));
    });
    it('should set initial mode when local storage has value', (done: DoneCallback) => {

      expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBe(ColorMode.Dark);

      service.currentMode$.subscribe((mode) => {
        expect(mode).toBe(ColorMode.Dark);
        expect(document.body.getAttribute(service.attrName)).toBe(ColorMode.Dark);
        done();
      });
    });

    it('should use local storage value to determine toggle if its set', (done: DoneCallback) => {
      expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBe(ColorMode.Dark);

      service.currentMode$.subscribe((mode) => {
        expect(mode).toBe(ColorMode.Light);
        done();
      });

      service.toggleMode();
    });
  });

  describe('with initial query value set to dark', () => {

    beforeEach(() => {
      ({service, query} = initialiseTest(ColorMode.Dark, true));
    });

    it('should toggle color mode from dark to light', (done: DoneCallback) => {

      service.currentMode$.subscribe((mode) => {
        expect(mode).toBe(ColorMode.Light);
        expect(document.body.getAttribute(service.attrName)).toBe(ColorMode.Light);
        expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBe(ColorMode.Light);
        done();
      });

      service.toggleMode();
    });

    it('should update mode when system mode value changes from dark to light', (done: DoneCallback) => {
      expect(service.currentMode).toBe(ColorMode.Dark);

      service.currentMode$.subscribe((mode) => {
        expect(mode).toBe(ColorMode.Dark);
        expect(document.body.getAttribute(service.attrName)).toBe(ColorMode.Dark);
        expect(window.localStorage.getItem(COLOR_MODE_KEY)).toBeNull();
        done();
      });

      query.triggerCb({
        matches: null
      });
    });
  });
});
