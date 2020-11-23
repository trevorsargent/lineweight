import { Injectable } from '@angular/core'
import { ScheduleService } from './schedule.service'

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor(private schedule: ScheduleService) {}

  private _loaded: boolean = false

  private _started: boolean = false

  private _active: boolean = false

  private startHook: () => void

  registerStartHook(startHook: () => void) {
    this.startHook = startHook
  }

  public notifyLoaded() {
    this._loaded = true
  }

  get loaded() {
    return this._loaded
  }

  public notifyStarted() {
    if (this.schedule.getCurrentEventTimeCode()) {
      this.startHook()
    } else {
      setTimeout(
        this.startHook,
        this.schedule.getNextEvent().diffNow().as('milliseconds'),
      )
    }
    this._started = true
  }

  get started() {
    return this._started
  }

  public notifyActive() {
    this._active = true
  }

  get active() {
    return this._active
  }
}
