import { AscentVM } from '../../../models/ascent.vm';
import * as _ from 'lodash';
import { Ascent } from '../../../models/ascent.model';
import { Crag } from '../../../models/crag.model';
import { Sector } from '../../../models/sector.model';
import { AscentsState } from 'app/store/interfaces/ascents/ascents-state';

function selector<T extends Crag | Sector>(array: T[], key: string, value: string): T {
  const elem: T =  _.find(array, [key, value]);
  return elem;
}                                                      

export function mapStateToAscents(state: AscentsState): AscentVM[] {
  
  const ascents: Ascent[] = state.ascentsStoreData.ascentData.ascents;
  const crags: Crag[] = state.ascentsStoreData.ascentData.crags;
  const sectors: Sector[] = state.ascentsStoreData.ascentData.sectors;

  if (ascents) {
    return ascents.map(ascent => ({
      id: ascent._id,
      name: ascent.name,
      type: ascent.type,
      grade: ascent.grade,
      style: ascent.style,
      sentDate: ascent.sentDate,
      location: {
        country: selector<Crag>(crags, "_id", ascent.cragId).country,
        crag: selector<Crag>(crags, "_id", ascent.cragId).name,
        sector: selector<Sector>(sectors, "_id", ascent.sectorId).name
      }
    }));
  } else {
    return null;
  }
  

}