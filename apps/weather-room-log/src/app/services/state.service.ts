import { Injectable } from '@angular/core'
import { ScheduleService } from './schedule.service'

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor(private schedule: ScheduleService) {}

  private _loaded: boolean = false

  private _started: boolean = false

  private _active: boolean = false

  private activateHook: () => void
  private postShowHook: () => void
  private resetHook: () => void

  registerActivateHook(activateHook: () => void) {
    this.activateHook = activateHook
  }

  registerPostShowHook(postShowHook: () => void) {
    this.postShowHook = postShowHook
  }

  registerResetHook(resetHook: () => void) {
    this.resetHook = resetHook
  }

  public notifyLoaded() {
    this._loaded = true
  }

  get showControls() {
    return (
      this._loaded &&
      this._active &&
      this.schedule.getCurrentEventTimeCode() <
        this.schedule.PERFORMANCE_DURATION.as('seconds')
    )
  }

  get loaded() {
    return this._loaded
  }

  get started() {
    return this._started
  }

  public notifyStarted() {
    if (this.schedule.getCurrentEventTimeCode()) {
      this.activateHook()
    } else {
      setTimeout(this.activateHook, this.schedule.getTimeToNextShowMilis())
    }
    this._started = true
  }

  public notifyActive() {
    setTimeout(this.postShowHook, this.schedule.getTimeToPostShowMilis())
    setTimeout(this.resetHook, this.schedule.getTimeToResetMilis())
    setTimeout(this.reset.bind(this), this.schedule.getTimeToResetMilis())
    this._active = true
  }

  get active() {
    return this._active
  }

  get preshow() {
    return !this.schedule.getCurrentEventTimeCode()
  }

  reset() {
    this._started = false
    this._active = false
  }
}
