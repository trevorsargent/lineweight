import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoTrackComponent } from './video-track/video-track.component';
import { SurfaceComponent } from './surface/surface.component';
import { ControlsComponent } from './controls/controls.component';
import { DownByTheRiverComponent } from './pages/down-by-the-river/down-by-the-river.component';
import { VideoCollectionComponent } from './video-collection/video-collection.component';
import { PaperComponent } from './paper/paper.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoTrackComponent,
    SurfaceComponent,
    ControlsComponent,
    DownByTheRiverComponent,
    VideoCollectionComponent,
    PaperComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
