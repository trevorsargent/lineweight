import { Injectable } from '@nestjs/common'
import { createSwitch, CreateSwitchOptions } from './switch/functions'
import { Switch } from './switch/types'

@Injectable()
export class SwitchService {
  switches: Map<String, Switch>

  addSwitch(key: string, options: CreateSwitchOptions) {
    this.switches.set(key, createSwitch(options))
  }

  setMatrix(key: string, input: string, output: string): void {}

  outputForInput(key: string, input: string): string {
    return ''
  }

  inputForOutput(key: string, output: string): string {
    return ''
  }
}
