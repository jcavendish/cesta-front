import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Store from '../../components/Store';

export default (props) => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [measure, setMeasure] = useState('');
  const [lookup, setLookup] = useState('');

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

  const context = {
    store,
    products,
    lookup,
    setLookup: (value) => setLookup(value),
    click: () => handleClick(),
    delete: (id) => handleDelete(id),
  };

  return (
    <Store context={context}>
      {{
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
      }}
    </Store>
  );
};
