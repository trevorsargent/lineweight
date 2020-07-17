import 'reflect-metadata'

import {
  Laamp as L,
  LaampGateway as LG,
  LaampChannel as LC,
  LaampGatewayInfo as LGI,
  LaampLamp as LL,
  LaampDevice as LD,
} from '@lineweight/laamp'

import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Arg,
  buildSchema,
  Mutation,
  InputType,
  ID,
  ResolverInterface,
  InterfaceType,
  createUnionType,
} from 'type-graphql'

import { connect } from '@lineweight/laamp'

import { ApolloServer } from 'apollo-server'
import { Color as C, Intensity as I, ID as StringID } from '@lineweight/types'

import { app } from '@lineweight/laamp'
import { context } from '@lineweight/laamp'

@ObjectType()
export class LaampGatewayInfo implements LGI {
  @Field()
  name: string

  @Field((type) => String)
  id: StringID

  @Field()
  address: string
}

const LaampDevice = createUnionType({
  name: 'LaampDevice',
  types: () => [LaampLamp] as const,
  resolveType: (value) => {
    if (value.deviceType === 'lamp') {
      return LaampLamp
    }
  },
})

@ObjectType()
export class LaampLamp implements LL {
  @Field((type) => String)
  id: StringID

  deviceType: 'lamp'

  @Field((type) => String)
  color: C

  @Field((type) => Number)
  intensity: I
}

@ObjectType()
export class LaampGateway implements LG {
  @Field((type) => String)
  id: StringID

  @Field((type) => LaampGatewayInfo)
  info: LGI

  @Field((type) => [LaampDevice])
  devices: LL[]
  // events: Observable<LaampGatewayEvent>
}

@ObjectType()
export class LaampChannel implements LC {
  @Field((type) => String)
  id: StringID

  @Field((type) => [LaampDevice])
  devices: LD[]

  @Field((type) => String)
  name: string
}

@ObjectType()
export class Laamp implements L {
  devices: LD[]
  @Field((type) => LaampGateway)
  gateways: LG[]

  @Field((type) => [LaampChannel])
  channels: LC[]

  sendCommand() {
    return false
  }
}

@InputType({ description: 'Identity and Passkey for Tradfri Gateway' })
class ConnectGatewayInput {
  @Field()
  identity: string

  @Field()
  psk: string
}

@Resolver(Laamp)
class LaampResolver {
  @Query((returns) => Laamp)
  laamp() {}

  // @Mutation((returns) => Boolean)
  // connectGateway(@Arg('auth') auth: ConnectGatewayInput) {
  //   connect(auth).subscribe((ll) => {})
  //   return true
  // }
}

@InputType()
class LaampLampInput implements Omit<LL, 'deviceType'> {
  @Field()
  id: string
  @Field()
  color: string
  @Field()
  intensity: number
}

@InputType({ description: 'Channel parameter values to set' })
class SetChannelLampsInput implements LC {
  @Field((type) => LaampLampInput)
  devices: LD[]

  id: StringID
}

@Resolver(LaampChannel)
export class LaampChannelResolver {
  @Mutation((returns) => Boolean)
  setChannel(@Arg('channel') channel: SetChannelLampsInput) {
    // return l.sendCommand({
    //   setChannel: true,
    //   channel,
    // })
  }

  @Query((returns) => [LaampChannel])
  channels() {
    return app.channels.query.channels(context)
  }

  @Query((returns) => LaampChannel)
  channel(@Arg('id') id: String) {
    app.channels.query.channels(context)
  }
}

const PORT = process.env.PORT || 4000

export const startGraphQLServer = async () => {
  const schema = await buildSchema({
    resolvers: [LaampResolver, LaampChannelResolver],
  })

  const server = new ApolloServer({
    schema,
    playground: true,
  })

  const { url } = await server.listen(PORT)

  console.log(`Server is running, GraphQL Playground available at ${url}`)
}
