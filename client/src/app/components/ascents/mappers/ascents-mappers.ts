import { ApplicationState } from '../../../store/interfaces/application-state';
import { AscentVM } from '../../../models/ascent.vm';
import * as _ from 'lodash';
import { Ascent } from '../../../models/ascent.model';
import { Crag } from '../../../models/crag.model';
import { Sector } from '../../../models/sector.model';

const cragFinder = function(array: Crag[], key: string, value: string): Crag {
  const elem: Crag =  _.find(array, [key, value]);
    return elem;
}

const sectorFinder = function(array: Sector[], key: string, value: string): Sector {
  const elem: Sector =  _.find(array, [key, value]);
    return elem;
}

export function mapStateToAscents(state: ApplicationState): AscentVM[] {
  
  const ascents: Ascent[]= state.storeData.ascentData.ascents;
  const crags: Crag[]= state.storeData.ascentData.crags;
  const sectors: Sector[]= state.storeData.ascentData.sectors;

  return ascents.map(ascent => ({
    id: ascent._id,
    name: ascent.name,
    type: ascent.type,
    grade: ascent.grade,
    style: ascent.style,
    sentDate: ascent.sentDate,
    location: {
      country: cragFinder(crags, "_id", ascent.cragId).country,
      crag: cragFinder(crags, "_id", ascent.cragId).name,
      sector: sectorFinder(sectors, "_id", ascent.sectorId).name
    }
  }));

}