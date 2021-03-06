import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DownByTheRiverComponent } from './pages/down-by-the-river/down-by-the-river.component'
import { FlocksComponent } from './pages/flocks/flocks.component'
import { PaperComponent } from './pages/paper/paper.component'
import { SurfaceComponent } from './surface/surface.component'
import { VideoTrackComponent } from './video-track/video-track.component'

const routes: Routes = [
  { path: 'info', component: PaperComponent },
  { path: 'flocks', component: FlocksComponent },
  {
    path: '',
    component: DownByTheRiverComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
