export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Laamp = {
  __typename?: 'Laamp';
  gateways: Array<LaampGateway>;
  channels: Array<LaampChannel>;
};

export type LaampChannel = {
  __typename?: 'LaampChannel';
  id: Scalars['String'];
  devices: Array<LaampDevice>;
  name: Scalars['String'];
};

export type LaampGateway = {
  __typename?: 'LaampGateway';
  id: Scalars['String'];
  info: LaampGatewayInfo;
  devices: Array<LaampDevice>;
};

export type LaampGatewayInfo = {
  __typename?: 'LaampGatewayInfo';
  name: Scalars['String'];
  id: Scalars['String'];
  address: Scalars['String'];
};

export type LaampDevice = {
  id: Scalars['String'];
};

export type LaampLamp = LaampDevice & {
  __typename?: 'LaampLamp';
  color: Scalars['String'];
  intensity: Scalars['Float'];
};

export type LaampShade = LaampDevice & {
  __typename?: 'LaampShade';
  position: Scalars['Float'];
};

export type LaampLampInput = {
  id: Scalars['String'];
  color: Scalars['String'];
  intensity: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  setChannel: Scalars['Boolean'];
};


export type MutationSetChannelArgs = {
  channel: SetChannelLampsInput;
};

export type Query = {
  __typename?: 'Query';
  laamp: Laamp;
  channels: Array<LaampChannel>;
  channel: LaampChannel;
};


export type QueryChannelArgs = {
  id: Scalars['String'];
};

export type SetChannelLampsInput = {
  devices: Array<LaampLampInput>;
};

