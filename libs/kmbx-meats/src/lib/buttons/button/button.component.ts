import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'meat-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Input()
  text: string

  ngOnInit(): void {}
}
