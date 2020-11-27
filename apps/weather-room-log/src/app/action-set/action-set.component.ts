import { Component, Input, OnInit } from '@angular/core'
import { TrackId } from '../app.tracks'
import { Action } from '../services/log.service'

@Component({
  selector: 'app-action-set',
  templateUrl: './action-set.component.html',
  styleUrls: ['./action-set.component.scss'],
})
export class ActionSetComponent implements OnInit {
  constructor() {}

  @Input()
  actions: Action[]

  public TrackId = TrackId

  ngOnInit(): void {}
}
