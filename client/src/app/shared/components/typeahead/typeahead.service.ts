import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Crag } from 'app/models/crag.model';
import { CragsService } from 'app/services/crags.service';
import { AscentsService } from 'app/services/ascents.service';
import { Ascent } from 'app/models/ascent.model';
import { Sector } from 'app/models/sector.model';

@Injectable()
export class TypeaheadService {

  private subject = new BehaviorSubject([]);
  suggestions$: Observable<Crag[]> = this.subject.asObservable();

  constructor(
    private cragsService: CragsService,
    private ascentsService: AscentsService
  ) { }

  getSuggestons(doQuery: boolean, source: string, keyword: string) {
      if (doQuery) {
        if (keyword.length === 0 || keyword == '') {
          return Observable.of([]);
        } else {
          switch (source) {
              case 'crag':
                  return this.cragsService.queryCrags(keyword)
                      .map(res => res.payload)
                      .do((crags: Crag[]) => this.subject.next(crags));
              case 'ascent':
                  return this.ascentsService.queryAscents(keyword)
                      .map(res => res.payload)
                      .do((ascents: Ascent[]) => this.subject.next(ascents));
              // case 'sector':
              //     return this.sectorsService.querySectors(keyword)
              //             .map(res => res.payload)
              //             .do((sectors: Sector[]) => this.subject.next(sectors));
          }
        }
      } else {
        return Observable.of([]);
      }
      
  }

}