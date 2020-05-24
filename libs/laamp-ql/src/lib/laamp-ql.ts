import 'reflect-metadata'

import {
  Laamp as L,
  LaampGateway as LG,
  LaampChannel as LC,
  LaampGatewayInfo as LGI,
  LaampLamp as LL,
} from '@lineweight/laamp'

import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Arg,
  buildSchema,
  ID,
} from 'type-graphql'

import { connect } from '@lineweight/laamp'

import {
  identity,
  psk,
} from '../../../../apps/meatman/src/basestation.config/tradfri'

import { ApolloServer } from 'apollo-server'
import { Color as C, Intensity as I } from '@lineweight/types'

@ObjectType()
export class LaampGatewayInfo implements LGI {
  @Field()
  name: string

  @Field()
  id: string

  @Field()
  address: string
}

@ObjectType()
export class LaampLamp implements LL {
  lamp: true
  @Field((type) => String)
  color: C

  @Field((type) => Number)
  intensity: I

  @Field((type) => ID)
  id: string
}

@ObjectType()
export class LaampGateway implements LG {
  @Field((type) => LaampGatewayInfo)
  info: LGI

  @Field((type) => [LaampLamp])
  devices: LL[]
  // events: Observable<LaampGatewayEvent>
}

@ObjectType()
export class LaampChannel implements LC {
  @Field((type) => [LaampLamp])
  devices: LL[]
}

@ObjectType()
export class Laamp implements L {
  @Field((type) => LaampGateway)
  gateways: LG[]

  @Field((type) => [LaampChannel])
  channels: LC[]
}

@Resolver(Laamp)
class LaampResolver {
  constructor() {
    connect({ identity, psk }).subscribe((l) => {
      this.l = l
    })
  }

  l: L

  @Query((returns) => Laamp)
  laamp() {
    return this.l
  }
}

const PORT = process.env.PORT || 4000

export const start = async () => {
  const schema = await buildSchema({ resolvers: [LaampResolver] })

  const server = new ApolloServer({
    schema,
    playground: true,
  })

  const { url } = await server.listen(PORT)

  console.log(`Server is running, GraphQL Playground available at ${url}`)
}
