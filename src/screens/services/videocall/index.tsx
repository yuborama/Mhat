import { useMutation } from '@apollo/client';
import { useAtomValue } from 'jotai';
import React, { FCN } from 'react';
import { useLocation, useNavigate } from 'react-router-native';
import { css } from 'styled-components';
import { CREATE_VIDEO_CALL } from '~/apollo/mutations/videocall';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomLink from '~/components/@atoms/AtomLink';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';
import BackBar from '~/components/@molecules/BackBar';
import { MeAtom } from '~/jotai/me';
import { ProjectAtom } from '~/jotai/project';

const ServiceVideoCall: FCN = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ME = useAtomValue(MeAtom);
  const project = useAtomValue(ProjectAtom);
  const [createVideoRoom, { loading }] = useMutation(CREATE_VIDEO_CALL);
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <BackBar to="/" title="VIDEO LLAMADA" />
      <AtomView
        css={() => css`
          flex: 1;
          justify-content: center;
          align-items: center;
        `}
      >
        <AtomView
          css={() => css`
            flex: 1;
            justify-content: center;
            align-items: center;
          `}
        >
          <AtomText>{location.pathname}</AtomText>
          <AtomLink to="/">Back to Home</AtomLink>
          <AtomLink to={`${location?.pathname}/aasdsa`}>Go</AtomLink>
          <AtomText>Video LLamada</AtomText>
        </AtomView>
        <AtomView
          css={() => css`
            height: 90px;
            justify-content: center;
            align-items: flex-end;
            padding: 0 20px;
          `}
        >
          <AtomButton
            loading={loading}
            onPress={async () => {
              const { data } = await createVideoRoom({
                variables: {
                  input: {
                    projectId: project?.id,
                    memberId: ME?.id,
                    creatorEmail: ME?.email,
                    creatorName: `${ME?.profile?.firstName}-${ME?.profile?.lastName}`,
                    url: `app/meet/`,
                    typeVideo: 'MEET',
                  },
                },
              });

              navigate(`/videocall/${data?.createVideoRoom?.videoCall?.sessionName}`);
            }}
          >
            Nueva Video LLamada
          </AtomButton>
        </AtomView>
      </AtomView>
    </AtomView>
  );
};

export default ServiceVideoCall;
