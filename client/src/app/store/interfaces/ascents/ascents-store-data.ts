import { AscentData } from '../../../models/ascent-data.model';
import { AscentsStoreData } from './ascents-store-data';

export interface AscentsStoreData {
    ascentData: AscentData;
}

export const INITIAL_ASCENTS_STORE_DATA: AscentsStoreData = {
    ascentData: {
        ascents: [],
        crags: [],
        sectors: []
    }
};