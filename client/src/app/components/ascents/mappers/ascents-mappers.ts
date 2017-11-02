import { Ascent } from '../../../models/ascent.model';
import { ApplicationState } from '../../../store/application-state';


export function mapStateToAscents(state: ApplicationState): Ascent[] {
    return state.storeData.ascents;
  }