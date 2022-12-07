import axios from "axios";
import Resolution from "@unstoppabledomains/resolution";
import { udResolverKeys } from '@unstoppabledomains/tldsresolverkeys';

const SINGLE_ADDRESS_LIST = 'SINGLE';
const MULTI_ADDRESS_LIST = 'MULTI';
const UNS_COMMON_ERROR = "No address has been set for this Unstoppable Domain.";
const UNS_UNKNOWN_ERROR = "There was an error resolving the entered Unstoppable Domain. Please use the owners address instead.";
const UNS_CURRENCY_SPEC_ERROR = "The entered Unstoppable Domain does not have a crypto address for the selected currency. Let the owner know to add one!";
const UNS_CURRENCY_ERROR = "Unstoppable Domains does not support this currency. Try sending a different one or use the owners address instead.";

export function determineAddressType(asset) {
    return udResolverKeys.singleAddressList.includes(asset)
        ? SINGLE_ADDRESS_LIST
        : MULTI_ADDRESS_LIST;
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

export async function isValidUnstoppableDomainName(domainInput, api) {
    let isValidUD = false
    if (api) {
        const inputTld = domainInput.split(/\.(?=[^\.]+$)/) // regex allows for subdomains
        const response = await axios
        .get(`https://resolve.unstoppabledomains.com/supported_tlds`, {
        })
        .catch((err) => {
            //console.log(err)
        })
        isValidUD = response.data.tlds.includes(inputTld[inputTld.length - 1])
    } else {
        const udResolutionInstance = new Resolution();
        isValidUD = await udResolutionInstance
            .isSupportedDomain(domainInput)
            .catch((err) => {
                //console.log(err);
            });
    }
    return isValidUD;
}