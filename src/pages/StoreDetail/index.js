import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiX, FiArrowLeft } from 'react-icons/fi';

import Header from '../../components/Header';
import api from '../../services/api';
import Rate from '../../components/Rate';
import Form from '../../components/Form';
import { IconButton } from '../../components/Buttons';
import styled from 'styled-components';

export default function StoreDetail(props) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [measure, setMeasure] = useState('');

  const [store] = props.location.state;

  const history = useHistory();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`stores/${store.id}/products`);
      setProducts(response.data);
    }
    getProducts();
  }, [store]);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post(
      `stores/${store.id}/products`,
      {
        name,
        description,
        value,
        measure,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    const id = response.data.id;
    setProducts([{ id, name, description, value, measure }, ...products]);
    clearForm();
  }

  async function handleDelete(id) {
    try {
      await api.delete(`stores/${store.id}/products/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setProducts(products.filter((product) => id !== product.id));
    } catch (error) {
      console.log(error);
    }
  }

  function clearForm() {
    setName('');
    setDescription('');
    setValue('');
    setMeasure('');
  }

  function handleClick() {
    history.push('/lojas');
  }

  const form = {
    handleSubmit: (e) => handleSubmit(e),
    inputs: [
      {
        placeholder: 'Nome do produto',
        value: name,
        handleChange: (value) => setName(value),
      },
      {
        placeholder: 'Marca do produto',
        value: description,
        handleChange: (value) => setDescription(value),
      },
      {
        placeholder: 'Valor do produto',
        value: value,
        handleChange: (value) => setValue(value),
      },
      {
        placeholder: 'Unidade de medida do produto',
        value: measure,
        handleChange: (value) => setMeasure(value),
      },
    ],
    button: {
      action: {
        text: 'Registrar produto',
      },
    },
  };

  return (
    <div>
      <Header />
      <StoreDetailContainer>
        <StoreDetailContentContainer>
          <StoreDetailHeader {...store} OnClick={() => handleClick()} />
          <StoreDetailCards
            products={products}
            form={form}
            OnClick={(id) => handleDelete(id)}
          />
        </StoreDetailContentContainer>
      </StoreDetailContainer>
    </div>
  );
}

function StoreDetailHeader({ name, rate, OnClick }) {
  return (
    <StoreDetailTitle>
      <IconButton OnClick={() => OnClick()}>
        <FiArrowLeft size={36} />
      </IconButton>
      <HeaderTitle>{name}</HeaderTitle>
      <h4>
        <Rate rate={rate}></Rate>
      </h4>
    </StoreDetailTitle>
  );
}

const HeaderTitle = styled.h1`
  margin-right: 10px;
  font-size: 28px;
`;

function ProductTable({ products, OnClick }) {
  return (
    <ContainerTable>
      <Row>
        <ColumnHeader>Nome</ColumnHeader>
        <ColumnHeader>Marca</ColumnHeader>
        <ColumnHeader>Unidade</ColumnHeader>
        <ColumnHeader>Preço</ColumnHeader>
        <ColumnHeader></ColumnHeader>
      </Row>
      {products.map((product) => (
        <Row key={product.id}>
          <Column>{product.name}</Column>
          <Column>{product.description}</Column>
          <Column>{product.measure}</Column>
          <Column>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.value)}
          </Column>
          <Column>
            <IconButton OnClick={() => OnClick(product.id)}>
              <FiX size={16} />
            </IconButton>
          </Column>
        </Row>
      ))}
    </ContainerTable>
  );
}

const ContainerTable = styled.table`
  width: 100%;
  padding: 0;
  margin: 0;
  border-collapse: collapse;
`;

const Column = styled.td`
  list-style: none;
  background-color: #f0f0f5;
  padding: 20px 20px;
  margin: 0;
`;

const ColumnHeader = styled(Column)`
  font-weight: bold;
`;

const Row = styled.tr`
  &:not(:first-child) {
    border-top: 1px solid #e4e4f5;
  }
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

function StoreDetailCards({ products, form, OnClick }) {
  return (
    <StoreProductCard>
      <StoreCardLeftContainer>
        <Form {...form} />
      </StoreCardLeftContainer>
      {products.length ? (
        <StoreCardRightContainer>
          <ProductTable products={products} OnClick={(id) => OnClick(id)} />
        </StoreCardRightContainer>
      ) : (
        <h2 style={{ margin: 'auto' }}>Your store has 0 products</h2>
      )}
    </StoreProductCard>
  );
}

const StoreDetailContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
`;

const StoreDetailContentContainer = styled.section`
  margin-top: 150px;
`;

const StoreDetailTitle = styled.div`
  display: flex;
  align-items: center;
`;

const StoreProductCard = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  margin-top: 30px;
  justify-content: space-between;
`;

const StoreCardLeftContainer = styled.div`
  width: 50%;
  max-width: 380px;
`;

const StoreCardRightContainer = styled.div`
  box-shadow: 0 0 20px rgb(219, 219, 219);
  margin-left: 50px;
  height: 100%;
  width: 100%;
`;
