import Resolution from "@unstoppabledomains/resolution";
import { errorHandling } from './util'

export async function resolveSingleAddressUns(unsName, symbol) {
  const udResolutionInstance = new Resolution();
  const resolution = {};
  resolution.unsName = unsName;
  resolution.currency = symbol;
  resolution.address = await udResolutionInstance
    .addr(unsName, symbol)
    .catch((err) => {
      resolution.error = errorHandling(err.code);
    });
  return resolution;
}

export async function resolveMultiAddressUns(unsName, symbol, version) {
  const udResolutionInstance = new Resolution();
  const resolution = {};
  resolution.unsName = unsName;
  resolution.currency = symbol;
  resolution.version = version;
  resolution.address = await udResolutionInstance
    .multiChainAddr(unsName, symbol, version)
    .catch((err) => {
      resolution.error = errorHandling(err.code);
    });
  return resolution;
}

export async function reverseResolution(address) {
  const udResolutionInstance = new Resolution();
  const resolution = {};
  resolution.address = address;
  resolution.unsName = await udResolutionInstance
    .reverse(address)
    .catch((err) => {
      resolution.error = errorHandling(err.code);
    });
  return resolution;
}