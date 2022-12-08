import { gql } from '@apollo/client';

export const CREATE_VIDEO_CALL = gql`
  mutation createVideoRoom($input: CreateVideoRoomInput!) {
    createVideoRoom(input: $input) {
      videoCall {
        id
        projectId
        sessionId
        sessionName
      }
      roomAccessToken {
        createdAt
        roomName
        token
        participantIdentity
      }
    }
  }
`;

export const VERIFY_VIDEO_ROOM = gql`
  query VerifyVideoRoom($projectId: UUID!, $sessionName: String!) {
    verifyVideoRoom(projectId: $projectId, sessionName: $sessionName) {
      projectId
      sessionId
      sessionName
      url
      creatorName
      creatorEmail
      memberId
      typeVideo
      videoRoomMembers {
        fullName
        email
        id
        photo
      }
      id
      dateScheduled
      title
    }
  }
`;

export const ROOM_TOKEN_LIVE_KIT = gql`
  query RoomTokenLiveKit2(
    $projectId: UUID!
    $sessionName: String!
    $participantName: String!
    $memberId: String
    $photo: String!
  ) {
    roomTokenLiveKit2(
      projectId: $projectId
      sessionName: $sessionName
      participantName: $participantName
      memberId: $memberId
      photo: $photo
    ) {
      createtAt
      roomName
      token
      participantIdentity
    }
  }
`;
