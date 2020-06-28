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
} from 'type-graphql'

import { connect } from '@lineweight/laamp'

import { ApolloServer } from 'apollo-server'
import { Color as C, Intensity as I, ID as StringID } from '@lineweight/types'

import { app } from '@lineweight/laamp'

@ObjectType()
export class LaampGatewayInfo implements LGI {
  @Field()
  name: string

  @Field((type) => String)
  id: StringID

  @Field()
  address: string
}

@ObjectType()
export class LaampLamp implements LL {
  deviceType: 'lamp'
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
  @Field((type) => String)
  id: StringID

  @Field((type) => LaampGatewayInfo)
  info: LGI

  @Field((type) => [LaampLamp])
  devices: LL[]
  // events: Observable<LaampGatewayEvent>
}

@ObjectType()
export class LaampChannel implements LC {
  @Field((type) => String)
  id: StringID

  @Field((type) => [LaampLamp])
  devices: LL[]
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
  devices: LL[]

  id: StringID
}

@Resolver()
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
    return app.channels.query.channels()
  }

  @Query((returns) => LaampChannel)
  channel(@Arg('id') id: String) {
    app.channels.query.channels()
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
