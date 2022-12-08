import { AtomWrapper } from '@ixulabs/native-ui';
import React from 'react';
import { FlatList } from 'react-native';
import AtomLoader from '../AtomLoader';
import { AtomScrollInfiteTypes } from './types';

const AtomScrollInfite = <T extends object>(props: AtomScrollInfiteTypes<T>) => {
  const { data, component, dispatch, onScroll, pagination, loading } = props;
  // const [stateData, setStateData] = useState<T[]>([]);

  // useEffect(() => {
  //   setStateData([...(data ?? []), ...stateData]);
  // }, [data]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => component(item as T)}
      onEndReachedThreshold={0.8}
      onEndReached={() => {
        // console.log('pagination', pagination);
        if (pagination?.hasnextpage && dispatch && loading === false) {
          // console.log('en el if');
          dispatch?.({
            ...pagination,
            page: pagination?.hasnextpage ? (pagination?.page ?? 0) + 1 : pagination?.page,
          });
        }
        // console.log('onEndReached2');
        onScroll?.();
      }}
      ListFooterComponent={
        <>
          {loading && (
            <AtomWrapper alignItems="center">
              <AtomLoader loading={loading} />
            </AtomWrapper>
          )}
        </>
      }
      {...props}
      style={[{ width: '100%', paddingBottom: 20 }, props?.style]}
    />
  );
};
export default AtomScrollInfite;
