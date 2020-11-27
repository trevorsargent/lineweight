import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
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

  ngOnInit(): void {
    console.log('init')
    // this.checkedChange.asObservable().subscribe((x) => console.log(x))
  }
}
