import axios from "axios";
import { errorHandling } from './util'

const access_token = process.env.REACT_APP_API_KEY;

async function getUns(unsName) {
    const response = await axios
        .get(`https://resolve.unstoppabledomains.com/domains/${unsName}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .catch((err) => {
            console.log(err)
        })
    return response.data.records;
}

export async function resolveSingleAddressUnsApi(unsName, symbol) {
    const records = await getUns(unsName);
    const resolution = {};
    resolution.unsName = unsName;
    resolution.currency = symbol;
    if (records && Object.keys(records).length !== 0 && Object.getPrototypeOf(records) === Object.prototype) {
        Object.keys(records).forEach(record => {
            if (record.startsWith(`crypto.${symbol}.address`)) {
                resolution.address = records[record];
            }
        });
        if (!resolution.address) {
            resolution.error = errorHandling('RecordNotFound');
        }
    } else {
        resolution.error = errorHandling('UnregisteredDomain');
    }

    return resolution;
}

export async function resolveMultiAddressUnsApi(unsName, symbol, version) {
    const records = await getUns(unsName);
    const resolution = {};
    resolution.unsName = unsName;
    resolution.currency = symbol;
    if (records && Object.keys(records).length !== 0 && Object.getPrototypeOf(records) === Object.prototype) {
        Object.keys(records).forEach(record => {
            if (record.startsWith(`crypto.${symbol}`)) {
                if (record.endsWith(`.version.${version}.address`)) {
                    resolution.address = records[record];
                }
            }
        });
        if (!resolution.address) {
            resolution.error = errorHandling('RecordNotFound');
        }
    } else {
        resolution.error = errorHandling('UnregisteredDomain');
    }

    return resolution;
}

export async function reverseResolutionApi(address) {
    const resolution = {};
    resolution.address = address;
    const response = await axios
        .get(`https://resolve.unstoppabledomains.com/reverse/${address}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .catch((err) => {
            console.log(err)
        })
    resolution.unsName = response.data.meta.domain;
    return resolution;
}