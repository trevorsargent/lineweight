import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { MenuComponent } from './menu/menu.component'
import { EventListComponent } from './event-list/event-list.component'
import { EventInfoComponent } from './event-info/event-info.component'
import { HomeComponent } from './home/home.component'
import { ScheduleService } from './services/schedule.service'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EventListComponent,
    EventInfoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    RouterModule.forRoot(
      [
        {
          path: 'home',
          component: HomeComponent,
        },
        {
          path: 'event/:department/:category/:slug',
          component: EventInfoComponent,
        },

        { path: '', redirectTo: '/home', pathMatch: 'full' },
      ],
      { initialNavigation: 'enabled' },
    ),
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
