import { ScheduleItem } from './schedule.service'
import { DateTime, Duration } from 'luxon'

export const meatEvents: Optionalize<ScheduleItem, 'duration'>[] = [
  {
    title: 'Pot Pie!',
    blurb:
      "Someone's in the kitchin with Dinah... Someone's in the kitchin I know...",
    department: 'food',
    category: 'masochism',
    startTime: DateTime.fromObject({}).plus(
      Duration.fromObject({ seconds: 10 }),
    ),
    slug: 'pot-pie',
    icon: 'cake',
  },
  {
    title: 'No Touching!',
    blurb: `Creating a center.....\n...for being centered`,
    department: 'art',
    category: 'zen',
    startTime: DateTime.fromObject({
      year: 2020,
      month: 6,
      day: 21,
      hour: 0,
      minute: 0,
    }),
    slug: 'no-touching',
    icon: 'edit',
  },
  {
    title: 'Meat the Lawn!',
    blurb:
      'Yes we got a new lawn\n' +
      "Yes the meat puns are going to be laddled on thick. I'm not sorry at all",
    department: 'yard',
    category: 'lawn',
    startTime: DateTime.fromObject({
      year: 2020,
      month: 6,
      day: 20,
      hour: 12,
      minute: 0,
    }),
    slug: 'new-lawn',
    icon: 'eco',
  },
  {
    title: 'House Ratings!',
    blurb:
      "7.9 from the Russion Judge Yes the meat puns are going to be laddled on thick. I'm not sorry at all",
    department: 'holiday',
    category: 'christmas',
    startTime: DateTime.fromObject({
      year: 2020,
      month: 12,
      day: 25,
      hour: 22,
      minute: 0,
    }),
    slug: 'house-ratings',
    icon: 'eco',
  },
  {
    title: 'Celebrity Shuffleboard',
    blurb:
      'I dont even know what this is' +
      "Yes the meat puns are going to be laddled on thick. I'm not sorry at all",
    department: 'yard',
    category: 'humor',
    startTime: DateTime.fromObject({
      year: 2020,
      month: 4,
      day: 20,
      hour: 13,
      minute: 0,
    }),
    slug: 'shuffleboard',
    icon: 'eco',
  },
  {
    title: 'Puppy Power!!!',
    blurb: 'Dog!\n' + 'Yes the meat',
    department: 'yard',
    category: 'lawn',
    startTime: DateTime.fromObject({
      year: 2020,
      month: 6,
      day: 30,
      hour: 12,
      minute: 0,
    }),
    slug: 'new-lawn',
    icon: 'eco',
  },
]

export type Optionalize<T, K extends keyof T> = Omit<T, K> | T
