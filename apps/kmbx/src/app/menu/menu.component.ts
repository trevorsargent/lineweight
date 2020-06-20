import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'kmbx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor() {}

  @Input()
  smallMeatball: boolean

  ngOnInit(): void {}
}
