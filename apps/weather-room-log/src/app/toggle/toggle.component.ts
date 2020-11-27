import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  constructor() {}

  @Input()
  label: string

  @Input()
  checked: boolean

  @Output()
  checkedChange = new EventEmitter<boolean>()

  onCheckedChange(x) {
    this.checkedChange.emit(x.srcElement.checked)
  }
}
