import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiX, FiArrowLeft } from 'react-icons/fi';

import Header from '../Header';
import api from '../../services/api';

import './style.css';

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

  const headers = {
    Authorization: localStorage.getItem('token'),
  };
  console.log(headers.Authorization);

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
      { headers }
    );
    const id = response.data;
    setProducts([{ id, name, description, value, measure }, ...products]);
    clearForm();
  }

  function clearForm() {
    setName('');
    setDescription('');
    setValue('');
    setMeasure('');
  }

  async function handleDelete(id) {
    try {
      await api.delete(`stores/${store.id}/products/${id}`, { headers });
      setProducts(products.filter((product) => id !== product.id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    history.push('/lojas');
  }

  return (
    <div>
      <Header />
      <div className="store-detail-container">
        <section className="content-container">
          <div className="store-detail-title">
            <button className="icon-button" onClick={handleClick}>
              <FiArrowLeft size={36} />
            </button>
            <h1>{store.name}</h1>
            <h4>{store.rate}</h4>
          </div>
          <div className="store-products-card">
            <section className="store-card-left-container">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  placeholder="Nome do produto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Marca do produto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  placeholder="Valor do produto"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <input
                  placeholder="Unidade de medida"
                  value={measure}
                  onChange={(e) => setMeasure(e.target.value)}
                />
                <button type="submit" className="button">
                  Registrar produto
                </button>
              </form>
            </section>
            {products.length ? (
              <section className="store-card-right-container">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Marca</th>
                    <th>Unidade</th>
                    <th>Preço</th>
                    <th></th>
                  </tr>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.measure}</td>
                      <td>
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.value)}
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FiX size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </table>
              </section>
            ) : (
              <h2 style={{ margin: 'auto' }}>Your store has 0 products</h2>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
