import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

import { DefaultInput } from './Input';

export default function SearchContainer({ OnChange }) {
  const [lookup, setLookup] = useState('');

  useEffect(() => {
    OnChange(lookup);
  }, [lookup]);

  return <Search lookup={lookup} OnChange={(value) => setLookup(value)} />;
}

function Search({ lookup, OnChange }) {
  return (
    <SeachInput
      placeholder="Procure por um produto"
      value={lookup}
      OnChange={(value) => OnChange(value)}
      icon={<SearchIcon size={24} color="#dcdce6" />}
    />
  );
}

const SearchIcon = styled(FiSearch)`
  position: absolute;
  z-index: 1;
  margin: 25px 0 0 15px;
`;

const SeachInput = styled(DefaultInput)`
  position: relative;
  padding-left: 50px;
  margin-right: 0;
`;
