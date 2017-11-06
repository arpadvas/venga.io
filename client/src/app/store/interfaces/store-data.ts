import { AscentData } from '../../models/ascent-data.model';
import { StoreData } from './store-data';

export interface StoreData {
    ascentData: AscentData;
}

export const INITIAL_STORE_DATA: StoreData = {
    ascentData: {
        ascents: [],
        crags: [],
        sectors: []
    }
};