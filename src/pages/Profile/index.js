import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiTrash2, FiArrowRight } from 'react-icons/fi';

import api from '../../services/api';
import Header from '../../components/Header';
import Rate from '../../components/Rate';
import { IconButton, PrimaryLinkButton } from '../../components/Buttons';
import styled from 'styled-components';

export default function ProfileContainer() {
  const history = useHistory();

  const token = localStorage.getItem('token');

  if (!token) {
    history.push('/');
  }

  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStores = async () => {
      try {
        const response = await api.get('profile', {
          headers: {
            Authorization: token,
          },
        });

        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStores();
  }, [token]);

  function handleSelect(store) {
    history.push('/loja/detalhe', [store]);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`stores/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setStores(stores.filter((store) => store.id !== id));
  }

  return (
    <Profile
      stores={stores}
      actions={{
        delete: (id) => handleDelete(id),
        select: (store) => handleSelect(store),
      }}
    />
  );
}

function Profile({ stores, actions }) {
  return (
    <ProfileWrapper>
      <Header
        button={
          <PrimaryLinkButton to="/loja/cadastrar">
            Cadastrar nova loja
          </PrimaryLinkButton>
        }
      />
      <StoreList stores={stores} actions={actions} />
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
`;

function StoreList({ stores, actions }) {
  return (
    <Container>
      <Title>Lojas cadastradas</Title>
      <UnorgList>
        {stores.map((store) => (
          <StoreCard store={store} actions={actions} />
        ))}
      </UnorgList>
    </Container>
  );
}

function StoreCard({ store, actions }) {
  return (
    <ListItem key={store.id}>
      <CardInfo name={store.name} rate={store.rate} />
      <CardButtons store={store} actions={actions} />
    </ListItem>
  );
}

function CardButtons({ store, actions }) {
  return (
    <ContentButtons>
      <IconButton OnClick={() => actions.delete(store.id)}>
        <FiTrash2 size={20} color="a8a8b3" />
      </IconButton>
      <IconButton OnClick={() => actions.select(store)}>
        <FiArrowRight size={20} color="a8a8b3" />
      </IconButton>
    </ContentButtons>
  );
}

const ContentButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function CardInfo({ name, rate }) {
  return (
    <div>
      <Strong>NAME:</Strong>
      <Paragraph>{name}</Paragraph>

      <Strong>RATE:</Strong>
      <Rate rate={rate}></Rate>
    </div>
  );
}

const Paragraph = styled.p`
  color: #737380;
  line-height: 21px;
  font-size: 16px;

  & + strong {
    margin-top: 32px;
  }
`;

const Strong = styled.strong`
  display: block;
  margin-bottom: 16px;
  color: #41414d;
`;

const Container = styled.section`
  margin-top: 150px;
`;

const Title = styled.h2`
  margin-top: 80px;
  margin-bottom: 24px;
`;

const UnorgList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;
`;

const ListItem = styled.li`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
  box-shadow: -2px 2px 5px #999;

  display: flex;
  justify-content: space-between;
`;
