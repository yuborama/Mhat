import React, { FCN } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import { AtomIcon, AtomText, AtomWrapper } from '@ixulabs/native-ui';
import AtomImage from '~/components/@atoms/AtomImage';
import { useQuery } from '@apollo/client';
import { IQueryFilter } from '~/types';
import { PET_BY_ID } from '~/apollo/querys/pet';
import AtomLoaderView from '~/components/@atoms/AtomLoaderView';
import { ScrollView, StyleSheet } from 'react-native';
import convertDateWithOptions from '~/utils/convertDateWithOptions';
import diffDates from '~/utils/diifDates';
import AtomMap from '~/components/@atoms/AtomMap';
import { IPet } from '~/types/schemas';
import BackBar from '~/components/@molecules/BackBar';
import AtomComponentRole from '~/components/@atoms/AtomComponetRole';

const fillDataPet = (data: IPet) => {
  const dataPet = {
    id: data.id ?? '  ',
    name: data?.name ?? ' ',
    image:
      data?.images?.[0] ??
      'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/dogDefualt.png',
    type: data.petType ?? ' ',
    breed: data.breed ?? ' ',
    gender: data.gender ?? ' ',
    size: data.size ?? ' ',
    color: data.color ?? ' ',
    sterilized: data.sterilized ? `Si, ${data?.locationOfSterilization}` : `No`,
    diseases: data?.diseases?.length > 0 ? data.diseases.join(', ') : 'Sin enfermedades',
    dateOfBirth: data.dateOfBirth ?? ' ',
    createdAt: data.createdAt ?? ' ',
    latitude: data?.latitude ?? 0,
    longitude: data?.longitude ?? 0,
    address: data?.address && data?.address !== '' ? data?.address : 'Sin dirección',
    zone: data?.zone && data?.zone !== '' ? data.zone : 'Sin zona',
    owner: data.user?.name ?? 'Sin dueño',
    ownerDni: data.user?.dNI ?? 'Sin dueño',
  };
  return dataPet;
};

const dateNow = new Date();

const PetByIdScreen: FCN = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { data, loading } = useQuery<IQueryFilter<'petById'>>(PET_BY_ID, {
    skip: !id,
    variables: {
      petByIdId: id,
    },
  });
  const petData = fillDataPet(data?.petById ?? ({} as IPet));
  // console.log(`petData`, petData);
  return (
    <AtomLoaderView loading={loading}>
      <AtomView
        css={() => css`
          flex: 1;
        `}
      >
        <AtomWrapper>
          <AtomWrapper
            backgroundColor={petData.gender === 'MALE' ? '#167bd8' : '#fc77ff'}
            height="320px"
            alignItems="center"
            justifyContent="flex-end"
            customCSS={css`
              border-bottom-left-radius: 80px;
              border-bottom-right-radius: 80px;
            `}
          >
            <BackBar
              stlyes={{
                AtomView: () => css`
                  background-color: transparent;
                  justify-content: space-between;
                `,
              }}
            >
              <AtomComponentRole AutorizationRoles={['CENSOR', 'ADMIN', 'SUPER_ADMIN']}>
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
                <AtomButton
                  type="button"
                  css={() => css`
                    background-color: transparent;
                    padding: 0px;
                  `}
                >
                  <AtomIcon
                    color="#ffffff"
                    uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/trash.svg"
                    height="20"
                    width="20"
                  />
                </AtomButton>
              </AtomComponentRole>
            </BackBar>
            <AtomWrapper
              customCSS={css`
                width: 200px;
                height: 200px;
                border-radius: 30px;
                overflow: hidden;
                background-color: #ffffff;
              `}
            >
              <AtomImage
                source={{
                  uri: petData.image,
                }}
              />
              <AtomWrapper
                alignItems="center"
                backgroundColor="#00000069"
                customCSS={css`
                  position: absolute;
                  bottom: 0px;
                `}
              >
                <AtomText fontSize="25px" color="#ffffff">
                  {petData.name}
                </AtomText>
                <AtomWrapper flexDirection="row" justifyContent="center">
                  <AtomText fontSize="18px" color="#E0F0FF">
                    {petData.type}
                  </AtomText>
                  {petData.breed && petData.breed.length > 0 && (
                    <AtomText fontSize="18px" color="#E0F0FF">
                      -{petData.breed}
                    </AtomText>
                  )}
                </AtomWrapper>
              </AtomWrapper>
            </AtomWrapper>
            <AtomWrapper
              customCSS={css`
                background-color: ${petData.gender === 'MALE' ? '#167bd8' : '#fc77ff'};
                height: 80px;
                width: 80px;
                border-radius: 50px;
                margin-bottom: -40px;
                justify-content: center;
                align-items: center;
                border: 5px solid #ffffff;
              `}
            >
              <AtomIcon
                color="#ffffff"
                uri={
                  petData.gender === 'MALE'
                    ? 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/male.svg'
                    : 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/TLD-001/icons/female.svg'
                }
              />
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
          }}
        >
          <AtomWrapper flexDirection="row">
            <AtomWrapper
              customCSS={css`
                padding: 20px;
                width: 50%;
              `}
            >
              <AtomText style={Styles.label}>Dueño</AtomText>
              <AtomText style={Styles.data}>{petData.owner}</AtomText>
              <AtomText style={Styles.label}>Tamaño</AtomText>
              <AtomText style={Styles.data}>{petData.size}</AtomText>
              <AtomText style={Styles.label}>Color</AtomText>
              <AtomText style={Styles.data}>{petData.color}</AtomText>
              <AtomText style={Styles.label}>Esterilizado</AtomText>
              <AtomText style={Styles.data}>{petData.sterilized}</AtomText>
            </AtomWrapper>
            <AtomWrapper
              customCSS={css`
                padding: 20px;
                width: 50%;
              `}
            >
              {petData.owner !== 'Sin dueño' && (
                <>
                  <AtomText style={Styles.label}>C.C. Dueño</AtomText>
                  <AtomText style={Styles.data}>{petData.owner}</AtomText>
                </>
              )}
              <AtomText style={Styles.label}>ID de mascota</AtomText>
              <AtomText style={Styles.data}>{petData.id}</AtomText>
              <AtomText style={Styles.label}>Edad</AtomText>
              <AtomText style={Styles.data}>
                {diffDates(petData.dateOfBirth ?? '', dateNow)} años
              </AtomText>
              <AtomText style={Styles.label}>Enfermedades</AtomText>
              <AtomText style={Styles.data}>{petData.diseases}</AtomText>
              <AtomText style={Styles.label}>Fecha Registro</AtomText>
              <AtomText style={Styles.data}>{convertDateWithOptions(petData.createdAt)}</AtomText>
            </AtomWrapper>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              flex-direction: row;
              padding: 0 20px;
              justify-content: space-around;
              align-items: center;
            `}
          >
            <AtomWrapper
              customCSS={css`
                width: 40%;
                height: 100px;
              `}
            >
              {/* {petData.latitude && petData.longitude && petData.address.length > 0 && (
                <> */}
              <AtomMap
                latitude={petData.latitude}
                longitude={petData.longitude}
                markers={[
                  {
                    coordinate: {
                      latitude: petData.latitude,
                      longitude: petData.longitude,
                    },
                  },
                ]}
              />
              {/* </>
              )}  */}
            </AtomWrapper>
            <AtomWrapper
              customCSS={css`
                width: 40%;
                height: auto;
              `}
            >
              <AtomWrapper>
                <AtomText style={Styles.label}>Dirección</AtomText>
                <AtomText style={Styles.data}>{petData.address}</AtomText>
              </AtomWrapper>
              <AtomWrapper>
                <AtomText style={Styles.label}>Zona</AtomText>
                <AtomText style={Styles.data}>{petData.zone}</AtomText>
              </AtomWrapper>
            </AtomWrapper>
          </AtomWrapper>
        </ScrollView>
      </AtomView>
    </AtomLoaderView>
  );
};
export default PetByIdScreen;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 50,
    paddingRight: 10,
  },
  label: {
    fontSize: 20,
    color: '#167BD8',
    fontWeight: 'bold',
    marginTop: 15,
  },
  data: {
    fontSize: 16,
    color: '#64707D',
  },
  map: {
    width: 150,
    height: 100,
  },
});
