import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { MenuComponent } from './menu/menu.component'
import { EventListComponent } from './event-list/event-list.component'

@NgModule({
  declarations: [AppComponent, MenuComponent, EventListComponent],
  imports: [
    BrowserModule,

    RouterModule.forRoot(
      [
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
        {
          path: '',
          pathMatch: 'full',
          component: AppComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
