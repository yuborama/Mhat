import { useQuery } from '@apollo/client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'react-router-native';
import { VERIFY_VIDEO_ROOM } from '~/apollo/mutations/videocall';
import { MeAtom } from '~/jotai/me';
import { ProjectAtom } from '~/jotai/project';
import { RoomParticipantAtom, RoomVerifyAtom } from '~/jotai/room';
import { IQueryFilter } from '~/types';

const useRoomVerify = () => {
  const project = useAtomValue(ProjectAtom);
  const params = useParams();
  const ME = useAtomValue(MeAtom);
  const [roomVerify, setRoomVerify] = useAtom(RoomVerifyAtom);
  const setRoomParticipant = useSetAtom(RoomParticipantAtom);
  const query = useQuery<IQueryFilter<'verifyVideoRoom'>>(VERIFY_VIDEO_ROOM, {
    variables: {
      projectId: project?.id,
      sessionName: params?.room,
    },
  });

  useEffect(() => {
    setRoomVerify(query);
    setRoomParticipant(`${ME?.profile?.firstName}-${ME?.profile?.lastName}`);
  }, [query]);

  return roomVerify ?? query;
};

export default useRoomVerify;
