import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { VideoTrackComponent } from './video-track/video-track.component'

const routes: Routes = [
  {
    path: '',
    component: VideoTrackComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
