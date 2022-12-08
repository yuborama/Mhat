import { useAtomValue } from 'jotai';
import React, { FCN, useState } from 'react';
import { useLocation, useParams } from 'react-router-native';
import { css } from 'styled-components';
import AtomLink from '~/components/@atoms/AtomLink';
import AtomLoaderView from '~/components/@atoms/AtomLoaderView';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';
import BackBar from '~/components/@molecules/BackBar';
import useRoomToken from '~/hooks/useRoomToken';
import useRoomVerify from '~/hooks/useRoomVerify';
import { Camera, CameraType } from 'expo-camera';
import { RoomAtom } from '~/jotai/room';
import AtomButton from '~/components/@atoms/AtomButton';

const ServiceVideoCall: FCN = () => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const params = useParams();
  const location = useLocation();
  const room = useAtomValue(RoomAtom);

  useRoomVerify();
  useRoomToken();
  console.log('data', room?.track);

  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <BackBar to="/videocall" title="MEET" />
      <AtomLoaderView loading={!room?.token}>
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
            {permission?.granted ? (
              <Camera style={{ flex: 1, backgroundColor: 'red', width: '100%' }} type={type}>
                <AtomView
                  css={() => css`
                    flex: 1;
                    background-color: transparent;
                    flex-direction: column;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <AtomButton
                    onPress={() => {
                      console.log('Press');
                      setType((current) =>
                        current === CameraType.back ? CameraType.front : CameraType.back
                      );
                    }}
                  >
                    <AtomText>Flip Camera</AtomText>
                  </AtomButton>
                </AtomView>
              </Camera>
            ) : (
              <AtomView
                css={() => css`
                  flex: 1;
                  background-color: black;
                  flex-direction: column;
                  width: 100%;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <AtomButton onPress={requestPermission}>Request Permission</AtomButton>
              </AtomView>
            )}
            <AtomText>{location.pathname}</AtomText>
            <AtomLink to="/">Back to Home</AtomLink>
            <AtomLink to={`${location?.pathname}/aasdsa`}>Go</AtomLink>
            <AtomText>Room: {params?.room}</AtomText>
            <AtomText>Video LLamada</AtomText>
          </AtomView>
          <AtomView
            css={() => css`
              height: 90px;
              justify-content: center;
              align-items: flex-end;
              padding: 0 20px;
            `}
          ></AtomView>
        </AtomView>
      </AtomLoaderView>
    </AtomView>
  );
};

export default ServiceVideoCall;
