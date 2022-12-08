import React, { FCN } from 'react';
import { Outlet, Route, useLocation, useParams } from 'react-router-native';
import { css } from 'styled-components';
import AtomLink from '~/components/@atoms/AtomLink';
import AtomText from '~/components/@atoms/AtomText';
import AtomView from '~/components/@atoms/AtomView';

const ServiceCodeName: FCN = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);

  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <AtomText>
        {location.pathname} - {params.codeName}
      </AtomText>
      <AtomLink to="/">Back to Home</AtomLink>
      <AtomLink to={`${location?.pathname}/aasdsa`}>Go</AtomLink>
      <AtomText>{params?.codeName}</AtomText>
      <Outlet />
    </AtomView>
  );
};

export default ServiceCodeName;
