import { Ascent } from '../models/ascent.model';
import { StoreData } from './store-data';

export interface StoreData {
    ascents: Ascent[];
    // TODO: add crags and sectors
}

export const INITIAL_STORE_DATA: StoreData = {
    ascents: []
};