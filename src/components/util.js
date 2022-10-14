import Resolution from "@unstoppabledomains/resolution";
import { udResolverKeys } from '@unstoppabledomains/tldsresolverkeys';

const SINGLE_CHAIN = 'SINGLE_CHAIN';
const MULTI_CHAIN = 'MULTI_CHAIN';
const UNS_COMMON_ERROR = "No address has been set for this Unstoppable Domain.";
const UNS_UNKNOWN_ERROR = "There was an error resolving the entered Unstoppable Domain. Please use the owners address instead.";
const UNS_CURRENCY_SPEC_ERROR = "The entered Unstoppable Domain does not have a crypto address for the selected currency. Let the owner know to add one!";
const UNS_CURRENCY_ERROR = "Unstoppable Domains does not support this currency. Try sending a different one or use the owners address instead.";

export function determineChainType(asset) {
    return udResolverKeys.singleChain.includes(asset)
        ? SINGLE_CHAIN
        : MULTI_CHAIN;
}

export function errorHandling(error) {
    let prettyError;
    if (error === 'UnregisteredDomain') {
        prettyError = UNS_COMMON_ERROR;
    } else if (
        error === 'UnspecifiedCurrency' ||
        error === 'RecordNotFound'
    ) {
        prettyError = UNS_CURRENCY_SPEC_ERROR;
    } else if (error === 'UnsupportedCurrency') {
        prettyError = UNS_CURRENCY_ERROR;
    } else {
        //console.log(error);
        prettyError = UNS_UNKNOWN_ERROR;
    }
    return prettyError
}

export async function isValidUnstoppableDomainName(domainInput) {
    const udResolutionInstance = new Resolution();
    const isValidUD = await udResolutionInstance
        .isSupportedDomain(domainInput)
        .catch((err) => {
            //console.log(err);
            return false
        });
    return isValidUD;
}