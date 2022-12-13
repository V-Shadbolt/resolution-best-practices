
# Unstoppable Domains Resolution

This example app provides a best-practices guideline on how to implement Unstoppable Domains Resolution. It demonstrates both an API and javascript library integration. 

**Prereq**
Rename `.apikey` to `.env` and replace `00000000-0000-0000-0000-000000000000` with your Unstoppable Domains Resolution API key

### Install 
**NPM**
`npm install`

**Yarn**
`yarn install`

## Library

The `library.js` file outlines the two basic functions needed to resolve Unstoppable Domains using the javascript library. The token you're looking for will dictate which of the two functions you'll need to use.

```javascript
export async function resolveSingleAddressUns(domain, token) {}
export async function resolveMultiAddressUns(domain, token, mapping) {}
```

The `library.js` file also outlines the basic function needed to reverse resolve an ETH address to an unstoppable domain. ***Note:*** Reverse resolve only supports Ethereum addresses

```javascript
export async function reverseResolution(address) {}
```

## API


The `api.js` file outlines the three basic functions needed to resolve Unstoppable Domains using the unstoppable API. `getUns` pulls all associated wallet addresses / records for the specified domain. The token you're looking for will dictate which of the two `resolve` functions you'll need to use to parse the records response.

```javascript
async function getUns(domain) {}
export async function resolveSingleAddressUnsApi(domain, token) {}
export async function resolveMultiAddressUnsApi(domain, token, mapping) {}
```

The `api.js` file also outlines the basic function needed to reverse resolve an ETH address to an unstoppable domain. ***Note:*** Reverse resolve only supports Ethereum addresses

```javascript
export async function reverseResolutionApi(address) {}
```

## Utilities

The `util.js` file outlines the three optional functions that can improve your resolution integration. 

```javascript
export function determineAddressType(token) {}
```
Is used as a pointer for the resolve functions outlined above. This function takes advantage of this [npm package](https://www.npmjs.com/package/@unstoppabledomains/tldsresolverkeys). Which lists all of the tokens Unstoppable Domains supports, breaks them down into Single and Multi address lists and then maps the Multi address tokens to the supported chains. While optional, this function is highly recommended. ***Note:*** the [npm package](https://www.npmjs.com/package/@unstoppabledomains/tldsresolverkeys) also contains all supported Unstoppable TLDs but it is not covered in this repo.

```javascript
export function errorHandling(error) {}
```
Is used to prettify the error messages you will get from the `library.js` method and to insert error messaging into the `api.js` method. The messaging contained in this function will cover the various errors you might come across.

```javascript
export async function isValidUnstoppableDomainName(error) {}
```
Is used to determine if a user input contains a valid Unstoppable Domain TLD. The function contains both methodology for using the `library.js` and `api.js` methods. The function compares an input to a pre-made and ever-evolving list of supported TLDs without the need for hardcoding. This will allow Unstoppable to continue to scale without breaking your existing integration. ***Note:*** As mentioned, you can also use the TLD list contained in this [npm package](https://www.npmjs.com/package/@unstoppabledomains/tldsresolverkeys) should you not want to hit an API endpoint for the list (hitting this API on every user input can drastically impact dapp performance).

The `util.js` file also outlines an ETH address plausibility function which returns a plausible true or false for an inputed ETH address but does not verify the address against a checksum. 

```javascript
export function isAddress (address) {}
```

## Running the Script
`yarn start`
`npm start`