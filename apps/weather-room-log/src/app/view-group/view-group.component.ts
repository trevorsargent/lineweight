import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { Action, ViewGroup } from '../services/log.service'

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
  constructor() {}

  @Input()
  group: ViewGroup

  @Input()
  currentViewerId: string

  @Input()
  limitHeight: boolean = false

  @Output()
  detailViewId = new EventEmitter<string>()

  stacked: boolean = false

  setStacked(stacked: boolean) {
    this.stacked = stacked
  }

  getViewsHeight() {
    return this.stacked ? 8 : this.group?.views.length * 4
  }

  getTopOffset(index: number) {
    return this.stacked ? 0 : index * 4
  }

  isMe(id: string) {
    return id === this.currentViewerId
  }

  labelSelect(id: string) {
    this.detailViewId.emit(id)
  }

  ngOnInit(): void {}
}
