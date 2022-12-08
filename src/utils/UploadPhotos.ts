import { IPhotos } from '~/components/@atoms/AtomUploadPhotos';
import getFileFromUrl from './getFileFromUrl';
import uploadImage from './uploadImage';

const UpdoadPhotos = async (photos: IPhotos[], name = 'name', orgCode = 'TLD-001') => {
  const photosURL = await Promise.all(
    photos.map(async (photo, i) => {
      const { uri } = photo;
      const file = await getFileFromUrl(uri, `${name}-${i}`);
      const url = await uploadImage(file as File, {
        name: 'userpictures.jpg',
        orgcode: orgCode,
      });
      return url;
    })
  );
  return photosURL as string[];
};

export default UpdoadPhotos;
