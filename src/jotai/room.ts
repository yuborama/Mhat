import { OperationVariables, QueryResult } from '@apollo/client';
import { atom } from 'jotai';
import { IQueryFilter } from '~/types';
import { LocalVideoTrack, Room } from 'livekit-client';

export const RoomVerifyAtom = atom(
  {} as QueryResult<IQueryFilter<'verifyVideoRoom'>, OperationVariables>
);

export const RoomTokenAtom = atom(
  {} as QueryResult<IQueryFilter<'roomTokenLiveKit2'>, OperationVariables>
);

export const RoomParticipantAtom = atom(null as unknown as string);

const RoomLiveKit = atom(new Room());

export const RoomTrackAtom = atom(null as unknown as LocalVideoTrack);

export const RoomAtom = atom((get) => ({
  participant: get(RoomParticipantAtom),
  verify: get(RoomVerifyAtom)?.data?.verifyVideoRoom,
  token: get(RoomTokenAtom)?.data?.roomTokenLiveKit2?.token,
  room: get(RoomLiveKit),
  track: get(RoomTrackAtom),
}));
