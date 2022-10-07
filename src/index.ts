export type ElementType = Element | HTMLElement;

export interface Option {
  onChange: (fullAble: boolean) => void;
}

export class FullScreenn {
  static readonly instanceCache: WeakMap<ElementType, FullScreenn | null>;
  static readonly fullScreenEnabled = document.fullscreenEnabled;
  readonly target?: ElementType;

  constructor(target: ElementType, option?: Option) {
    if (!target) {
      throw new Error("target is a dom");
    }
    this.target = target;
    if (FullScreenn.instanceCache.has(target)) {
      return FullScreenn.instanceCache.get(target)!;
    } else {
      return this.bootstrap(option);
    }
  }

  get fullScreen() {
    return !!document.fullscreenElement;
  }

  requestFullScreen() {
    return this.target!.requestFullscreen();
  }

  exitFullScreen() {
    return document.exitFullscreen();
  }

  handleChangeFullScreen() {
    return this.fullScreen ? this.exitFullScreen() : this.requestFullScreen();
  }

  bootstrap(option?: Option) {
    FullScreenn.instanceCache.set(this.target!, null);
    this.target!.onfullscreenchange = () => {
      option?.onChange(this.fullScreen);
    };

    const instace = new FullScreenn(this.target!);
    FullScreenn.instanceCache.set(this.target!, instace);
    return instace;
  }
}
