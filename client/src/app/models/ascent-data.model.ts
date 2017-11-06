import { Ascent } from './ascent.model';
import { Crag } from './crag.model';
import { Sector } from './sector.model';

export interface AscentData {
    ascents: Ascent[];
    crags: Crag[];
    sectors: Sector[];
}