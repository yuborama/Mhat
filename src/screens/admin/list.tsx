import React, { FCN, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { css } from 'styled-components/native';
import AtomButton from '~/components/@atoms/AtomButton';
import AtomView from '~/components/@atoms/AtomView';
import { useQuery } from '@apollo/client';
import { IQueryFilter } from '~/types';
import { LIST_USERS } from '~/apollo/querys/user';
import AtomScrollInfite from '~/components/@atoms/AtomScrollInfite';
import MoleculeCardUser from '~/components/@molecules/MoleculeCardUser';
import { StatePagination } from '~/components/@atoms/AtomScrollInfite/types';
import { IUser } from '~/types/schemas';
import MoleculeHeaderFilter from '~/components/@molecules/MoleculeHeraderFilter';

const AdminListScreen: FCN = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [ShowSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState<StatePagination>({
    page: 0,
    limit: 5,
    hasnextpage: false,
    hasprevpage: false,
    pagingcounter: 0,
    totaldocs: 5,
  });
  const { loading } = useQuery<IQueryFilter<'listUsers'>>(LIST_USERS, {
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
            dNI: {
              contains: filter,
            },
          },
        ],
        role: {
          eq: 'ADMIN',
        },
      },
    },
    onCompleted: (data) => {
      setPagination({
        hasnextpage: data?.listUsers?.pageInfo?.hasNextPage ?? pagination.hasnextpage,
        hasprevpage: data?.listUsers?.pageInfo?.hasPreviousPage ?? pagination.hasprevpage,
        page: pagination.page,
        limit: pagination.limit,
        pagingcounter: pagination.pagingcounter,
        totaldocs: data?.listUsers?.totalCount ?? pagination.totaldocs,
      });
      setUsers((prev) => {
        const uniqueitems = data?.listUsers?.items?.filter((item) => {
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
        title="Lista de administradores"
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
          <MoleculeCardUser
            name={item?.name}
            document={item?.dNI}
            tel={item?.phone}
            onPress={() => navigate(`/Admin/${item?.id}`)}
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
        onPress={() => navigate('/Admin/create')}
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
export default AdminListScreen;
