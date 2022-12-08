import { useQuery } from '@apollo/client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router-native';
import { ROOM_TOKEN_LIVE_KIT } from '~/apollo/mutations/videocall';
import { MeAtom } from '~/jotai/me';
import { ProjectAtom } from '~/jotai/project';
import { RoomAtom, RoomTokenAtom, RoomTrackAtom } from '~/jotai/room';
import { IQueryFilter } from '~/types';

const useRoomToken = () => {
  const room = useAtomValue(RoomAtom);
  const ME = useAtomValue(MeAtom);
  const params = useParams();
  const project = useAtomValue(ProjectAtom);
  const [roomToken, setRoomToken] = useAtom(RoomTokenAtom);
  const query = useQuery<IQueryFilter<'roomTokenLiveKit2'>>(ROOM_TOKEN_LIVE_KIT, {
    skip: !room?.participant,
    variables: {
      participantName: room?.participant,
      photo: ME?.profile?.photo,
      sessionName: params?.room,
      projectId: project?.id,
      memberId: ME?.id,
    },
  });

  useEffect(() => {
    setRoomToken(query);
  }, [query]);

  return roomToken ?? query;
};

export default useRoomToken;
