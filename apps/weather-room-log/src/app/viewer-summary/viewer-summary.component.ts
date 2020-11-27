import { animate, style, transition, trigger } from '@angular/animations'
import { translateType } from '@angular/compiler-cli/src/ngtsc/translator'
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { ObsError } from 'obs-websocket-js'
import { Observable, Subject } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { LogService, ViewGroup } from '../services/log.service'

@Component({
  selector: 'app-viewer-summary',
  templateUrl: './viewer-summary.component.html',
  styleUrls: ['./viewer-summary.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('300ms', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class ViewerSummaryComponent implements OnInit {
  constructor(private log: LogService) {}

  @Input()
  viewerId: string

  @Output()
  close = new EventEmitter()

  visits$: Observable<ViewGroup>

  ngOnInit(): void {
    this.resetRx()
  }

  ngOnChanges(): void {
    this.resetRx()
  }

  resetRx() {
    this.visits$ = this.log.getViews$(this.viewerId)
  }

  emitClose() {
    this.close.emit()
  }
}
