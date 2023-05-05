import { makeAutoObservable } from 'mobx';

class State {
  private _scrollPrecent: number = 0
  private _isMobile: boolean = false
  private _activeCountryIndex: number = -1

  constructor() {
    makeAutoObservable(this);
  }

  getIsMobile(): boolean {
    return this._isMobile
  }

  setIsMobile(mobile: boolean): void {
    this._isMobile = mobile
  }

  getScrollPrecent(): number {
    return this._scrollPrecent
  }

  setActiveCountryIndex(index: number): void {
    this._activeCountryIndex = index
  }

  getActiveCountryIndex(): number {
    return this._activeCountryIndex
  }

  setScrollPrecent(precent: number): void {
    this._scrollPrecent = precent
    if (precent < 0) this._scrollPrecent = 0
    if (precent > 100) this._scrollPrecent = 100
  }
}

export default new State()