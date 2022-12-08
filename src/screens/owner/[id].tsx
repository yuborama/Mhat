import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import React, { FCN, useMemo } from 'react';
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
import { ScrollView } from 'react-native';
import MoleculeCardAnimal from '~/components/@molecules/MoleculeCardAnimal';
import { useAtomValue } from 'jotai';
import { MeAtom } from '~/jotai/me';
import ButtonLogout from '~/components/@molecules/ButtonLogout';
import BackBar from '~/components/@molecules/BackBar';
import AtomComponentRole from '~/components/@atoms/AtomComponetRole';

export const typesUser = {
  ADMIN: 'Administrador',
  USER: 'Usuario',
  CENSOR: 'Censador',
  RESEARCHER: 'Investigador',
  SUPER_ADMIN: 'Super Administrador',
};

const OwnerByIdScreen: FCN = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const me = useAtomValue(MeAtom);
  const idMemo = useMemo(() => id ?? me.id ?? '', [id, me.id]);
  const { data, loading } = useQuery<IQueryFilter<'userById'>>(USER_BY_ID, {
    skip: !idMemo,
    fetchPolicy: 'no-cache',
    variables: {
      userByIdId: idMemo,
    },
  });

  const [deleteUser, { loading: loadDelete }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      navigate(-1);
    },
  });

  // console.log(`location`, useLocation());
  console.log(`data`, data?.userById?.pets);
  console.log(`loading`, loading);
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <AtomLoaderView loading={loading}>
        <AtomComponentRole AutorizationRoles={['USER']}>
          <AtomView
            css={() => css`
              padding: 5px 20px;
              flex-direction: row;
              justify-content: flex-end;
            `}
          >
            <ButtonLogout />
          </AtomView>
        </AtomComponentRole>
        <AtomComponentRole AutorizationRoles={['CENSOR', 'ADMIN', 'SUPER_ADMIN']}>
          <BackBar
            iconColor="#40729f"
            stlyes={{
              AtomView: () => css`
                background-color: transparent;
                justify-content: flex-start;
              `,
            }}
          >
            <AtomView
              css={() => css`
                flex: 1;
              `}
            >
              <AtomButton
                css={() => css`
                  background-color: #28c825;
                  border-radius: 50px;
                  padding: 8px 60px;
                `}
              >
                <AtomText
                  customCSS={css`
                    color: #fff;
                    font-weight: normal;
                    font-size: 18px;
                  `}
                >
                  Editar
                </AtomText>
              </AtomButton>
            </AtomView>
          </BackBar>
        </AtomComponentRole>

        <AtomWrapper
          //   justifyContent="center"
          customCSS={css`
            flex: 1;
            padding: 20px;
            /* background-color: red; */
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
            <AtomText color="#167bd9">Nombre</AtomText>
            <AtomText>{data?.userById?.name}</AtomText>
            <AtomWrapper flexDirection="row">
              <AtomWrapper width="50%">
                <AtomText color="#167bd9">Documento</AtomText>
                <AtomText>{data?.userById?.dNI}</AtomText>
              </AtomWrapper>
              <AtomWrapper width="50%">
                <AtomText color="#167bd9">Telefono</AtomText>
                <AtomText>{data?.userById?.phone}</AtomText>
              </AtomWrapper>
            </AtomWrapper>
            <AtomText color="#167bd9">Email</AtomText>
            <AtomText>{data?.userById?.email}</AtomText>
            <AtomText color="#167bd9">Direccion</AtomText>
            <AtomText>{data?.userById?.location?.address}</AtomText>
            {/* <AtomText color="#167bd9">Fecha de creacion</AtomText>
            <AtomText>{convertDateWithOptions(data?.userById?.createdAt)}</AtomText>
            <AtomText color="#167bd9">Rol</AtomText>
            <AtomText> {typesUser[data?.userById?.role as keyof typeof typesUser]}</AtomText> */}
          </AtomWrapper>
          {/* <AtomWrapper alignItems="flex-end" width="98%">
            <AtomButton
              onPress={() =>
                deleteUser({
                  variables: {
                    deleteUserId: id,
                  },
                })
              }
              loading={loadDelete}
            >
              Eliminar
            </AtomButton>
          </AtomWrapper> */}
          <AtomWrapper
            alignItems="center"
            customCSS={css`
              padding: 5px;
            `}
          >
            <AtomText color="#167bd9" fontSize="18px" fontWeight="bold">
              Mascotas a cargo
            </AtomText>
          </AtomWrapper>
          <ScrollView>
            <AtomWrapper>
              {data?.userById?.pets.map((pet) => (
                <MoleculeCardAnimal
                  key={pet.id}
                  name={pet?.name}
                  typeanimal={pet?.petType}
                  url={pet?.images?.[0]}
                  location={pet?.address}
                  owner={data?.userById?.name}
                  ccOwner={data?.userById?.dNI}
                  race={pet?.breed}
                  onPress={() => navigate(`/Pet/${pet?.id}`)}
                />
              ))}
            </AtomWrapper>
          </ScrollView>
          <AtomComponentRole AutorizationRoles={['CENSOR', 'ADMIN', 'SUPER_ADMIN']}>
            <AtomButton
              style={{
                backgroundColor: '#167BD8',
                position: 'absolute',
                bottom: 30,
                right: 20,
                width: 70,
                height: 70,
                borderRadius: 35,
                padding: 0,
              }}
              onPress={() => navigate(`/Pet/create/${id}`)}
              textProps={{
                style: {
                  fontSize: 20,
                  color: '#fff',
                  margin: 10,
                  padding: 0,
                },
              }}
            >
              +
            </AtomButton>
          </AtomComponentRole>
        </AtomWrapper>
      </AtomLoaderView>
    </AtomView>
  );
};
export default OwnerByIdScreen;
