import React from 'react';
import { FiX, FiArrowLeft } from 'react-icons/fi';

import Header from './Header';
import Rate from './Rate';
import Form from './Form';
import { IconButton } from './Buttons';
import styled from 'styled-components';
import SearchContainer from './Search';

export default function Store({ context, children }) {
  return (
    <div>
      <Header />
      <Container>
        <ContentContainer>
          <HeaderContainer>
            <StoreHeader {...context.store} OnClick={() => context.click()} />
            <SearchContainer OnChange={(value) => context.filter(value)} />
          </HeaderContainer>
          <Card
            products={context.products}
            form={children}
            OnClick={() => context.delete()}
          />
        </ContentContainer>
      </Container>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

function StoreHeader({ name, rate, OnClick }) {
  return (
    <StoreDetailTitle>
      <IconButton OnClick={() => OnClick()}>
        <FiArrowLeft size={36} />
      </IconButton>
      <HeaderTitle>{name}</HeaderTitle>
      <Rate rate={rate}></Rate>
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
      <thead>
        <Row>
          <ColumnHeader>Nome</ColumnHeader>
          <ColumnHeader>Marca</ColumnHeader>
          <ColumnHeader>Unidade</ColumnHeader>
          <ColumnHeader>Preço</ColumnHeader>
          <ColumnHeader></ColumnHeader>
        </Row>
      </thead>
      <tbody>
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
      </tbody>
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

function Card({ products, form, OnClick }) {
  return (
    <CardContainer>
      <LeftCardContainer>
        <Form {...form} />
      </LeftCardContainer>
      {products.length ? (
        <RightCardContainer>
          <ProductTable products={products} OnClick={(id) => OnClick(id)} />
        </RightCardContainer>
      ) : (
        <h2 style={{ margin: 'auto' }}>Your store has 0 products</h2>
      )}
    </CardContainer>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
`;

const ContentContainer = styled.section`
  margin-top: 150px;
`;

const StoreDetailTitle = styled.div`
  display: flex;
  align-items: center;
  min-width: 320px;
`;

const CardContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  margin-top: 30px;
  justify-content: space-between;
`;

const LeftCardContainer = styled.div`
  width: 50%;
  max-width: 380px;
`;

const RightCardContainer = styled.div`
  box-shadow: 0 0 20px rgb(219, 219, 219);
  margin-left: 50px;
  height: 100%;
  width: 100%;
`;
