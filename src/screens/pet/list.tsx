import React, { FCN, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import { useQuery } from '@apollo/client';
import { IQueryFilter } from '~/types';
import AtomScrollInfite from '~/components/@atoms/AtomScrollInfite';
import { StatePagination } from '~/components/@atoms/AtomScrollInfite/types';
import { IPet } from '~/types/schemas';
import { LIST_PETS } from '~/apollo/querys/pet';
import MoleculeCardAnimal from '~/components/@molecules/MoleculeCardAnimal';
import MoleculeHeaderFilter from '~/components/@molecules/MoleculeHeraderFilter';

const PetListScreen: FCN = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IPet[]>([]);
  const [ShowSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState<StatePagination>({
    page: 0,
    limit: 15,
    hasnextpage: false,
    hasprevpage: false,
    pagingcounter: 0,
    totaldocs: 5,
  });
  const { loading } = useQuery<IQueryFilter<'listPets'>>(LIST_PETS, {
    fetchPolicy: 'no-cache',
    variables: {
      skip:
        pagination.page * pagination.limit > pagination.totaldocs
          ? pagination.totaldocs
          : pagination.page * pagination.limit,
      take: pagination.limit,
      filter: {
        or: [
          {
            name: {
              contains: filter,
            },
          },
          {
            breed: {
              contains: filter,
            },
          },
          {
            color: {
              contains: filter,
            },
          },
        ],
      },
    },
    onCompleted: (data) => {
      setPagination({
        hasnextpage: data?.listPets?.pageInfo?.hasNextPage ?? pagination.hasnextpage,
        hasprevpage: data?.listPets?.pageInfo?.hasPreviousPage ?? pagination.hasprevpage,
        page: pagination.page,
        limit: pagination.limit,
        pagingcounter: pagination.pagingcounter,
        totaldocs: data?.listPets?.totalCount ?? pagination.totaldocs,
      });
      setUsers((prev) => {
        const uniqueitems = data?.listPets?.items?.filter((item) => {
          return !prev.find((previtem) => previtem.id === item?.id);
        });
        return [...prev, ...(uniqueitems ?? [])];
      });
    },
  });
  return (
    <AtomView
      css={() => css`
        flex: 1;
      `}
    >
      <MoleculeHeaderFilter
        showSearch={ShowSearch}
        setShowSearch={() => setShowSearch(!ShowSearch)}
        title="Lista de Mascotas"
        onClear={() => {
          setFilter('');
          setUsers([]);
        }}
        onSubmmit={(value) => {
          setFilter(value.nativeEvent.text);
          setUsers([]);
        }}
      />
      <AtomScrollInfite
        data={users}
        loading={loading}
        style={{
          padding: 10,
        }}
        component={(item) => (
          <MoleculeCardAnimal
            name={item?.name}
            typeanimal={item?.petType}
            url={item?.images?.[0]}
            location={item?.address}
            race={item?.breed}
            onPress={() => navigate(`/Pet/${item?.id}`)}
          />
        )}
      />
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
        onPress={() => navigate('/Pet/create')}
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
    </AtomView>
  );
};
export default PetListScreen;
