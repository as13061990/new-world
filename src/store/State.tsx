import {makeAutoObservable} from 'mobx';

class State {
  public activeSection: number = 0
  constructor() {
    makeAutoObservable(this);
  }
}

export default new State()