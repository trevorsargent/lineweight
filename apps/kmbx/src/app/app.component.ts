import { Component } from '@angular/core'

@Component({
  selector: 'lineweight-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kmbx'

  upcomingEvents: ScheduleItem[] = [
    {
      title: 'Pot Pie!',
      blurb:
        "Someone's in the kitchin with Dinah\n" +
        "Someone's in the kitching i know (oh oh oh)",
      imgSrc: 'http://baconmockup.com/256/256',
      department: 'food',
      category: 'masochism',
      date: '6.19.2020',
      slug: 'pot-pie',
    },
    {
      title: 'Coron-art Corner - No Touching!',
      blurb: `Creating a center...\n` + '...for being centered',
      imgSrc: 'http://baconmockup.com/255/255',
      department: 'art',
      category: 'zen',
      date: '6..2020',
      slug: 'no-touching',
    },
  ]

  recentMeats: ScheduleItem[] = [
    {
      title: 'Meat the Lawn!',
      blurb:
        'Yes we got a new lawn\n' +
        "Yes the meat puns are going to be laddled on thick. I'm not sorry at all",
      imgSrc: 'http://baconmockup.com/254/254',
      department: 'yard',
      category: 'lawn',
      date: '6.14.2020',
      slug: 'new-lawn',
    },
  ]
}

export interface ScheduleItem {
  title: string
  blurb: string
  imgSrc: string
  department: string
  category: string
  slug: string
  date: string
}
