import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SurfaceComponent } from './surface/surface.component'
import { VideoTrackComponent } from './video-track/video-track.component'

const routes: Routes = [
  {
    path: '',
    component: SurfaceComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
