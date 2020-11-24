import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { VideoTrackComponent } from './video-track/video-track.component'
import { SurfaceComponent } from './surface/surface.component'
import { ControlsComponent } from './controls/controls.component'
import { DownByTheRiverComponent } from './pages/down-by-the-river/down-by-the-river.component'
import { VideoCollectionComponent } from './video-collection/video-collection.component'
import { NavigationComponent } from './navigation/navigation.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PaperComponent } from './pages/paper/paper.component'
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { FlocksComponent } from './pages/flocks/flocks.component'
import { CommonModule } from '@angular/common'

const config = {
  apiKey: 'AIzaSyCfWYw0YheqCx_XQ1G7gh1bux148Qwy3gg',
  authDomain: 'weather-room-log.firebaseapp.com',
  databaseURL: 'https://weather-room-log.firebaseio.com',
  projectId: 'weather-room-log',
  storageBucket: 'weather-room-log.appspot.com',
  messagingSenderId: '920206509105',
  appId: '1:920206509105:web:24b65b7415c77e6432c110',
}

@NgModule({
  declarations: [
    AppComponent,
    VideoTrackComponent,
    SurfaceComponent,
    ControlsComponent,
    DownByTheRiverComponent,
    VideoCollectionComponent,
    PaperComponent,
    NavigationComponent,
    FlocksComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
