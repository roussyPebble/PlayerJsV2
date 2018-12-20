import axios from 'axios';
import appConfig from '../../config';
import { getEpochTimeFromUtc } from '../../helpers/time';
import Axios from 'axios';

export function getProgramInfo(broadcastingStation, callback) {
    getBroadcastingStationSchedule(broadcastingStation).then((response) => {
        getCurrentProgram(response.data.broadcasts).then(response => {
            callback(response);
        });
    });
}

function getBroadcastingStationSchedule(broadcastingStation) {
    return new Promise((resolve) => {
        let requestParams = {
            headers: {'Authorization': appConfig.neuro.clientKey},
        };
        let url = `${appConfig.neuro.url}/broadcasting-stations/${broadcastingStation}/schedule?offset=0`;
        axios.get(url, requestParams).then((response) => {
            resolve(response);
        });
    });
}

function getCurrentProgram(broadcastsSchedule) {
    return new Promise((resolve) => {
        let currentBroadcastIndex = getCurrentProgramIndex(broadcastsSchedule);
        let requestParams = {
            headers: {'Authorization': appConfig.neuro.clientKey},
        };
        let url = `${appConfig.neuro.url}/programmes/${currentBroadcastIndex.broadcastableItem.id}`;
        Axios.get(url, requestParams).then(response => {
            resolve(response.data);
        });
    });
}

function getCurrentProgramIndex(broadcastsSchedule) {
    let currentEpoch = (new Date).getTime();
    let program;
    broadcastsSchedule.forEach((element) => {
        let startDate = getEpochTimeFromUtc(element.startsAt);
        let endDate = getEpochTimeFromUtc(element.endsAt);
        if (currentEpoch >= startDate && currentEpoch < endDate) {
            program = element;
        }
    });

    return program;
}