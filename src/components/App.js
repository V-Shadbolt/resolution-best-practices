import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import {
  determineChainType,
  isValidUnstoppableDomainName
} from './util'
import {
  resolveMultiChainUns,
  resolveSingleChainUns
} from './library'

import {
  resolveMultiChainUnsApi,
  resolveSingleChainUnsApi
} from './api'

const SINGLE_CHAIN = 'SINGLE_CHAIN';

const StyledInput = styled.input`
  display: block;
  margin: 40px 0px;
  border: 1px solid lightblue;
`;

function useInput() {
  const [value, setValue] = useState("");
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}

async function resolveUnsName(domain, currency, version, api) {
  const addressList = determineChainType(currency)
  let resolution = {};
  if (api) {
    if (addressList === SINGLE_CHAIN) {
      resolution = await resolveSingleChainUnsApi(domain, currency);
    } else {
      resolution = await resolveMultiChainUnsApi(domain, currency, version);
    }
  } else {
    if (addressList === SINGLE_CHAIN) {
      resolution = await resolveSingleChainUns(domain, currency);
    } else {
      resolution = await resolveMultiChainUns(domain, currency, version);
    }
  }
  resolution.addressList = addressList;
  return resolution;
}

function App() {
  let [domainData, setDomainData] = useState('');
  const [api, setApi] = useState(false);
  const [method, setMethod] = useState(true);
  const inputDomain = useInput();
  const inputCurrency = useInput();
  const inputVersion = useInput();

  const handleChange = () => {
    setApi(!api);
    setMethod(!method);
  };

  useEffect(() => {
    async function prepareResolutionCall() {
      if (await isValidUnstoppableDomainName(inputDomain.value, api) && inputCurrency.value !== undefined && inputCurrency.value !== "") {
        domainData = await resolveUnsName(inputDomain.value, inputCurrency.value, inputVersion.value, api);
        setDomainData(domainData);
      }
    }

    prepareResolutionCall();
  });

  return (
    <div>
      <span>
        <label>
          <input
            type="checkbox"
            checked={api}
            onChange={handleChange}
          />
          API
        </label>
        <label>
          <input
            type="checkbox"
            checked={method}
            onChange={handleChange}
          />
          Library
        </label>
      </span>
      <StyledInput
        {...inputDomain}
        placeholder="Type Unstoppable Domain here"
      />
      <StyledInput
        {...inputCurrency}
        placeholder="Type currency here (ETH, USDT, ...)"
      />
      <StyledInput
        {...inputVersion}
        placeholder="Type version here (ERC20, BEP20, TRON, ...)"
      />
      <div>Domain Name: {inputDomain.value} </div>
      <div>Currency: {inputCurrency.value} </div>
      <div>Version: {inputVersion.value} </div>
      <div>Address List: {domainData.addressList} </div>
      <div>Address: {domainData.address} </div>
      <div>Error: {domainData.error} </div>
    </div>
  );

}

export default App;
