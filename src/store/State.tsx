import { makeAutoObservable } from 'mobx';

class State {
  private _scrollPrecent: number = 0

  constructor() {
    makeAutoObservable(this);
  }

  getScrollPrecent(): number {
    return this._scrollPrecent
  }

  setScrollPrecent(precent: number): void {
    this._scrollPrecent = precent
    if (precent < 0) this._scrollPrecent = 0
    if (precent > 100) this._scrollPrecent = 100
  }
}

export default new State()