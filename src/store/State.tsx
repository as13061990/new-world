import { makeAutoObservable } from 'mobx';
import { modal } from '../types/enums';

const ANIMATION_DELAY = 500
const HINT_DELAY = 2000

class State {
  private _scrollPrecent: number = 0
  private _isMobile: boolean = false
  private _activeCountryIndex: number = -1
  private _historyCountries: number[] = [-1]
  private _isTimer: boolean = false
  private _activeHint: boolean = false
  private _modalActive: boolean = false
  private _modal: modal = modal.NO
  
  public modalCallbackActive: () => void = (): void => {console.log('modal set active')}
  public modalCallbackInactive: () => void = (): void => {console.log('modal set inactive')}

  constructor() {
    makeAutoObservable(this);
  }

  public getIsMobile(): boolean {
    return this._isMobile
  }

  public setIsMobile(mobile: boolean): void {
    this._isMobile = mobile
  }

  public getScrollPrecent(): number {
    return this._scrollPrecent
  }

  public getActiveHint(): boolean {
    return this._activeHint
  }

  public openHint(): void {
    if (!this._activeHint) {
      this._activeHint = true
      setTimeout(() => {
        this._activeHint = false
      }, HINT_DELAY)
    }
  }

  public setActiveCountryIndex(index: number): void {
    this._activeCountryIndex = -1
    if (this._historyCountries[this._historyCountries.length - 1] === -1) {
      this._activeCountryIndex = index
    } else {
      if (!this._isTimer) {
        this._isTimer = true
        setTimeout(() => {
          this._isTimer = false
          this._activeCountryIndex = index
        }, ANIMATION_DELAY)
      }
    }
    this._historyCountries.push(index)
  }

  public getActiveCountryIndex(): number {
    return this._activeCountryIndex
  }

  public setScrollPrecent(precent: number): void {
    this._scrollPrecent = precent
    if (precent < 0) this._scrollPrecent = 0
    if (precent > 100) this._scrollPrecent = 100
  }

  public getHistoryCountries(): number[] {
    return JSON.parse(JSON.stringify(this._historyCountries))
  }

  public setModal(modal: modal): void {
    this._modal = modal;
  }

  public getModal(): modal {
    return this._modal;
  }

  public setModalActive(modal: boolean): void {
    // if (modal) {
    //   this.modalCallbackActive()
    // } else {
    //   this.modalCallbackInactive()
    // }
    this._modalActive = modal;
  }

  public getModalActive(): boolean {
    return this._modalActive;
  }
}

export default new State()