import MultipleImagePicker, {
  ImageResults,
  VideoResults,
} from '@baronha/react-native-multiple-image-picker';
import { FC, useMemo, useState } from 'react';
import { css } from 'styled-components';
import isBackDark from '~/utils/isBackDark';
import AtomButton from '../AtomButton';
import AtomImage from '../AtomImage';
import { Asset, AtomImagePicker, HeaderData } from '../AtomImagePicker';
import AtomInputError from '../AtomInput/error';
import exportObject from '../AtomMultiple';
import AtomText from '../AtomText';
import AtomView from '../AtomView';
import { AtomUploadPhotosTypes } from './types';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AtomIcon, AtomModal } from '@ixulabs/native-ui';

export type IPhotos = Asset;

const AtomUploadPhotos: FC<AtomUploadPhotosTypes> = (props) => {
  const {
    id,
    formik,
    label,
    labelText,
    options = {},
    view,
    button,
    buttonText,
    buttonTextLabel,
    image,
    picker,
  } = props;
  const [images, setImages] = useState([] as IPhotos[]);
  const [viewImage, setViewImage] = useState(false);
  const imagesMemo = useMemo(
    () => (formik?.values?.[`${id}`] ?? images ?? []) as IPhotos[],
    [formik, id, images]
  );
  const firstImage = imagesMemo?.find((_, idx) => idx === 0) ?? ({} as IPhotos);
  const filterImages = useMemo(
    () => imagesMemo?.filter((_, idx) => idx > 0 && idx < 5) ?? [],
    [imagesMemo]
  );
  const moreImages = useMemo(() => imagesMemo?.filter((_, idx) => idx > 4) ?? [], [imagesMemo]);

  return (
    <AtomView
      {...view}
      css={(theme) => css`
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 16px;
        ${view?.css?.(theme)}
      `}
    >
      {viewImage && (
        <AtomModal
          isOpen={viewImage}
          colorModal="#ffffff"
          component={
            <AtomImagePicker
              onSave={(assets) => {
                const doFinish = (arr: IPhotos[]) => {
                  if (formik) {
                    formik?.setFieldValue(id, arr);
                  } else {
                    setImages(arr);
                  }
                };
                doFinish(assets);
                setViewImage(false);
              }}
              onCancel={() => setViewImage(false)}
              multiple
              noAlbums
              limit={10}
              albumColumns={3}
              galleryColumns={4}
              theme={{
                header: (props) => <HeaderComponent {...props} />,
              }}
              {...picker}
            />
          }
        />
      )}
      {labelText && (
        <AtomText
          {...label}
          css={(theme) => css`
            font-size: 14px;
            font-weight: 700;
            color: #167bd8;
            margin-bottom: 8px;
            ${buttonText?.css?.(theme)}
          `}
        >
          {labelText}
        </AtomText>
      )}
      <AtomImage
        source={{
          uri:
            firstImage?.uri ??
            'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg',
        }}
        {...image}
        css={(theme) => css`
          height: 200px;
          ${image?.css?.(theme)}
        `}
      />
      <AtomView
        css={() => css`
          flex: 1;
          margin-top: 10px;
          flex-direction: row;
        `}
      >
        {filterImages?.map((image) => (
          <AtomImage
            key={`FilteredImages-${image?.uri}`}
            source={{
              uri:
                image?.uri ??
                'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg',
            }}
            css={() => css`
              flex: 1;
              height: 60px;
              margin-right: 10px;
            `}
          />
        ))}
        {moreImages?.length > 0 && (
          <AtomView
            css={() => css`
              flex: 1;
              height: 100%;
              justify-content: center;
              align-items: center;
              background-color: #167bd8;
            `}
          >
            <AtomText
              css={() => css`
                font-size: 14px;
                font-weight: 700;
                color: #fff;
              `}
            >
              +{moreImages?.length}
            </AtomText>
          </AtomView>
        )}
      </AtomView>

      <AtomButton
        onPress={() => {
          setViewImage(true);
        }}
        {...button}
        css={(theme) => css`
          width: 100%;
          margin-top: 10px;
          background-color: #167bd8;
          ${button?.css?.(theme)}
        `}
      >
        <AtomText
          {...buttonText}
          css={(theme) => css`
            font-size: 12px;
            font-weight: 500;
            color: ${isBackDark('#167bd8')};
            ${buttonText?.css?.(theme)}
          `}
        >
          {buttonTextLabel ?? 'Upload Image'}
        </AtomText>
      </AtomButton>
      <AtomInputError name={id} formik={formik} />
    </AtomView>
  );
};

export default AtomUploadPhotos;

const HeaderComponent: FC<HeaderData> = (props) => {
  return (
    <View style={styles.defaultHeaderContainer}>
      {props.view == 'gallery' && (
        <>
          {!props.noAlbums && (
            <TouchableOpacity style={{ width: 30, height: 30 }} onPress={props.goToAlbum}>
              <Svg viewBox="0 0 256 512" {...props}>
                <Path
                  fill="black"
                  d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                />
              </Svg>
            </TouchableOpacity>
          )}
          {props.imagesPicked == 0 && (
            <>
              {props.album && <Text style={{ fontSize: 20 }}>{props.album.title}</Text>}
              {!props.album && props.multiple && (
                <Text style={{ fontSize: 20 }}>{'Selecciona las imagenes'}</Text>
              )}
              {!props.album && !props.multiple && (
                <Text style={{ fontSize: 20 }}>Selecciona una imagen</Text>
              )}
              <Pressable
                style={[
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={props.save}
              >
                <AtomIcon
                  uri="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/califarma/icons/close.svg"
                  color="#167bd8"
                />
              </Pressable>
            </>
          )}
          {props.imagesPicked > 0 && (
            <>
              {props.multiple && (
                <Text style={{ fontSize: 18 }}>has seleccionado {props.imagesPicked} imagenes</Text>
              )}
              {!props.multiple && <Text style={{ fontSize: 20 }}>Selected</Text>}
              <Pressable style={styles.defaultHeaderButton} onPress={props.save}>
                <Text style={styles.defaultHeaderButtonText}>Guardar</Text>
              </Pressable>
            </>
          )}
        </>
      )}
      {props.view == 'album' && (
        <>
          <Text style={{ fontSize: 20 }}>Select an album</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultHeaderContainer: {
    width: '100%',
    paddingTop: 80,
    padding: 20,
    height: 130,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 1,
  },
  defaultHeaderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  defaultHeaderButtonText: {
    fontSize: 14,
    letterSpacing: 0.25,
    color: 'white',
  },
});
