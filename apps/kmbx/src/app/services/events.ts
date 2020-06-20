import { ScheduleItem } from './schedule.service'
import { DateTime } from 'luxon'

export const upcomingMeats: ScheduleItem[] = [
  {
    title: 'Pot Pie!',
    blurb:
      "Someone's in the kitchin with Dinah... Someone's in the kitchin I know...",
    imgSrc: 'http://baconmockup.com/512/256',
    department: 'food',
    category: 'masochism',
    date: new DateTime.local(2020, 6, 22, 0, 0),
    allDay: true,
    slug: 'pot-pie',
    tags: ['chicken', 'pie', 'baking'],
    icon: 'cake',
  },
  {
    title: 'No Touching!',
    blurb: `Creating a center...\n` + '...for being centered',
    imgSrc: 'http://baconmockup.com/510/255',
    department: 'art',
    category: 'zen',
    date: new DateTime.local(2020, 6, 21, 0, 0),
    allDay: true,
    slug: 'no-touching',
    tags: ['art'],
    icon: 'edit',
  },
]

export const recentMeats: ScheduleItem[] = [
  {
    title: 'Meat the Lawn!',
    blurb:
      'Yes we got a new lawn\n' +
      "Yes the meat puns are going to be laddled on thick. I'm not sorry at all",
    imgSrc: 'http://baconmockup.com/508/254',
    department: 'yard',
    category: 'lawn',
    date: new DateTime.local(2020, 6, 20, 12, 0),
    allDay: false,
    slug: 'new-lawn',
    tags: ['gardening'],
    icon: 'eco',
  },
]
