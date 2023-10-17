import { makeAutoObservable, runInAction } from 'mobx';
import { content, modal } from '../types/enums';
import positions from '../three/positions';

const ANIMATION_DELAY = 500
const HINT_DELAY = 2000
export const MAX_STEP = positions.length

class State {
  private _scrollPrecent: number = 0
  private _isMobile: boolean = false
  private _activeCountryIndex: content = content.NO
  private _historyCountries: content[] = [content.NO]
  private _isTimer: boolean = false
  private _activeHint: boolean = false
  private _modalActive: boolean = false
  private _modalActivePrev: boolean = false
  private _modalPrev: modal = null
  private _modal: modal = modal.NO
  private _step: number = 0
  private _scrollTimer: number = 0
  private _point: boolean = false;
  private _isLoaded: boolean = false
  
  private _animation: boolean = false;
  private _iconPosition: string = JSON.stringify({ x: 0, y: 0 });
  public stepCallback: Function = (): void => {}

  constructor() {
    makeAutoObservable(this);
  }

  public getIsLoaded(): boolean {
    return this._isLoaded
  }

  public setIsLoaded(load: boolean) {
    this._isLoaded = load
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

  public setActiveCountryIndex(index: content): void {
    this._activeCountryIndex = content.NO
    if (this._historyCountries[this._historyCountries.length - 1] === content.NO) {
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

  public getActiveCountryIndex(): content {
    return this._activeCountryIndex
  }

  public setScrollPrecent(precent: number): void {
    this._scrollPrecent = precent
    if (precent < 0) this._scrollPrecent = 0
    if (precent > 100) this._scrollPrecent = 100
  }

  public getHistoryCountries(): content[] {
    return JSON.parse(JSON.stringify(this._historyCountries))
  }

  public setModal(modal: modal): void {
    this._modalPrev = this._modal
    if (this._modalActive) {
      this._modalActivePrev = this._modalActive
    }
    this._modal = modal;
  }

  public getModal(): modal {
    return this._modal;
  }

  public setModalActive(modal: boolean): void {
    this._modalActivePrev = this._modalActive
    this._modalActive = modal;
  }

  public getModalActive(): boolean {
    return this._modalActive;
  }

  public getModalActivePrev(): boolean {
    return this._modalActivePrev;
  }

  public getModalPrev(): modal {
    return this._modalPrev;
  }

  public getStep(): number {
    return this._step
  }

  public setStep(step: number): void {
    this._step = step
  }

  // MAX_STEP + 1 чтобы вернуть футер
  public plusStep(): void {
    if (this._step === MAX_STEP -1) return
    this._step++
    this.stepCallback()
  }

  public minusStep(): void {
    if (this._step === 0) return
    this._step--
    this.stepCallback()
  }

  public setScrollTimer(time: number): void {
    this._scrollTimer = time
  }

  public getScrollTimer(): number {
    return this._scrollTimer
  }

  public setIconPosition(x: number, y: number): void {
    this._iconPosition = JSON.stringify({ x, y });
  }
  
  public getIconPosition(): Vector2 {
    return JSON.parse(this._iconPosition);
  }

  public isAnimation(): boolean {
    return this._animation;
  }

  public setAnimation(animation: boolean): void {
    this._animation = animation;
  }

  public getPoint(): boolean {
    return this._point;
  }

  public setPoint(point: boolean): void {
    this._point = point;
  }
}

export default new State()