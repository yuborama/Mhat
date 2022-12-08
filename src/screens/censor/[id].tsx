import { AtomIcon, AtomInput, AtomWrapper } from '@ixulabs/native-ui';
import { useFormik } from 'formik';
import React, { FCN } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import { useMutation, useQuery } from '@apollo/client';
import { IQueryFilter } from '~/types';
import { USER_BY_ID } from '~/apollo/querys/user';
import convertDateWithOptions from '~/utils/convertDateWithOptions';
import AtomLoaderView from '~/components/@atoms/AtomLoaderView';
import { DELETE_USER } from '~/apollo/mutations/user';
import { useLocation } from 'react-router-native';
import BackBar from '~/components/@molecules/BackBar';
import AtomText from '~/components/@atoms/AtomText';

export const typesUser = {
  ADMIN: 'Administrador',
  USER: 'Usuario',
  CENSOR: 'Censador',
  RESEARCHER: 'Investigador',
  SUPER_ADMIN: 'Super Administrador',
};

const CensorByIdScreen: FCN = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { data, loading } = useQuery<IQueryFilter<'userById'>>(USER_BY_ID, {
    skip: !id,
    variables: {
      userByIdId: id,
    },
  });

  const [deleteUser, { loading: loadDelete }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      navigate(-1);
    },
  });

  console.log(`location`, useLocation());
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <AtomLoaderView loading={loading}>
        <BackBar
          iconColor="#40729f"
          stlyes={{
            AtomView: () => css`
              justify-content: flex-start;
            `,
          }}
        >
          <AtomView
            css={() => css`
              flex: 1;
            `}
          >
            <AtomText
              css={() => css`
                color: #40729f;
                font-weight: bold;
                font-size: 18px;
                max-width: 200px;
                text-align: center;
              `}
            >
              Detalle del Encuestador
            </AtomText>
          </AtomView>
        </BackBar>
        <AtomWrapper
          justifyContent="center"
          customCSS={css`
            flex: 1;
            padding: 20px;
          `}
        >
          <AtomWrapper
            customCSS={css`
              margin: 5px;
              padding: 20px;
              border: 1px solid #cdcdcd;
              border-radius: 25px;
              width: 98%;
            `}
          >
            <AtomText
              css={() => css`
                color: #167bd9;
              `}
            >
              Nombre
            </AtomText>
            <AtomText>{data?.userById?.name}</AtomText>
            <AtomWrapper flexDirection="row">
              <AtomWrapper width="50%">
                <AtomText
                  css={() => css`
                    color: #167bd9;
                  `}
                >
                  Documento
                </AtomText>
                <AtomText>{data?.userById?.dNI}</AtomText>
              </AtomWrapper>
              <AtomWrapper width="50%">
                <AtomText
                  css={() => css`
                    color: #167bd9;
                  `}
                >
                  Telefono
                </AtomText>
                <AtomText>{data?.userById?.phone}</AtomText>
              </AtomWrapper>
            </AtomWrapper>
            <AtomText
              css={() => css`
                color: #167bd9;
              `}
            >
              Email
            </AtomText>
            <AtomText>{data?.userById?.email}</AtomText>
            <AtomText
              css={() => css`
                color: #167bd9;
              `}
            >
              Fecha de creacion
            </AtomText>
            <AtomText>{convertDateWithOptions(data?.userById?.createdAt)}</AtomText>
            <AtomText
              css={() => css`
                color: #167bd9;
              `}
            >
              Rol
            </AtomText>
            <AtomText> {typesUser[data?.userById?.role as keyof typeof typesUser]}</AtomText>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              width: 98%;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
            `}
          >
            <AtomButton
              type="button"
              css={() => css`
                background-color: #28c825;
                width: 40%;
                justify-content: center;
                align-items: center;
                border-radius: 30px;
              `}
            >
              <AtomText
                astype="button"
                css={() => css`
                  color: #fff;
                `}
              >
                Editar
              </AtomText>
            </AtomButton>
            <AtomButton
              css={() => css`
                background-color: transparent;
                padding: 0px;
              `}
              onPress={() =>
                deleteUser({
                  variables: {
                    deleteUserId: id,
                  },
                })
              }
              loading={loadDelete}
              textProps={{
                css: () => css`
                  color: #fff;
                `,
              }}
            >
              <AtomIcon
                color="#ff0606"
                uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/trash.svg"
                height="20"
                width="20"
              />
            </AtomButton>
          </AtomWrapper>
        </AtomWrapper>
      </AtomLoaderView>
    </AtomView>
  );
};
export default CensorByIdScreen;
