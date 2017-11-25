import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, forwardRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AscentsService } from 'app/services/ascents.service';
import * as _ from 'lodash';
import { CragsService } from 'app/services/crags.service';
import { Crag } from 'app/models/crag.model';
import { Ascent } from 'app/models/ascent.model';
import 'rxjs/add/operator/map';
import { ServerResponse } from 'app/models/server-response.model';
import { TypeaheadService } from 'app/shared/components/typeahead/typeahead.service';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TypeaheadComponent),
  multi: true
};

interface suggestionHighlighted {
  full: {value: string, class: string};
  begin: {value: string, class: string};
  middle: {value: string, class: string};
  end: {value: string, class: string};
}

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TypeaheadComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input() type: string = 'text';
  @Input() text: string = ''; 
  @Input() widthPercentage: string; 
  @Input() placeHolder: string;
  @Input() control: FormControl = new FormControl();
  @Input() source: string;
  @ViewChild('input') inputRef: ElementRef;
  private innerValue: string = '';
  private doQuery: boolean = true;
  // suggestions: Observable<Ascent[] | Crag[]>;
  suggestions$: Observable<Crag[]>;
  // suggestionsHighlighted: suggestionHighlighted[];

  constructor(
    private typeaheadService: TypeaheadService
  ) { }

  get value(): string {
    return this.innerValue;
  };

  set value(v: string) {
      if (v !== this.innerValue) {
          this.innerValue = v;
      }
  }

  writeValue(value: string) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  propagateChange = (_: any) => { }

  onChange(e: Event, value: string){
    this.doQuery = true;
    this.innerValue = value;
    // this.suggestions$ = [];
    this.propagateChange(this.innerValue);
}

  ngAfterViewInit(){ }

  fillTextBox(value: string) {
    this.doQuery = false;
    this.inputRef.nativeElement.value = value;
    this.innerValue = value;
    this.propagateChange(value);
  }

  // highlightMatches() {
  //   let suggestionsHighlighted: suggestionHighlighted[] = [];
  //   let suggestionsNameList = this.suggestions.flatMap(suggestion => suggestion.map(el => el.name));
  //   suggestionsNameList.forEach((suggestion: string) => {
  //     let suggestionSplitted = suggestion.split(this.innerValue);
  //     suggestionSplitted.splice(1, 0, this.innerValue);
  //     let suggestionHighlighted: suggestionHighlighted = {
  //       full: {value: '', class: ''},
  //       begin: {value: '', class: ''},
  //       middle: {value: '', class: ''},
  //       end: {value: '', class: ''}
  //     };
  //     suggestionHighlighted.full.value = suggestion;
  //     suggestionHighlighted.begin.value = suggestionSplitted[0];
  //     suggestionHighlighted.middle.value = suggestionSplitted[1];
  //     suggestionHighlighted.end.value = suggestionSplitted[2];
  //     suggestionsHighlighted.push(suggestionHighlighted);
  //     suggestionsHighlighted.forEach(obj => {
  //       _.forEach(obj, (elem) => {
  //         console.log(elem);
  //         if (elem.value.indexOf(' ') === 0) {
  //           elem.class = 'inline';
  //         } else {
  //           elem.class = 'inline-block';
  //         }
  //       });
  //     });
  //   });
  //   this.suggestionsHighlighted = suggestionsHighlighted;
  // }

  ngOnInit() {
    if(this.placeHolder === undefined){
      this.placeHolder = 'Enter ' + this.text; 
    }
    this.control.valueChanges.subscribe(() => {
        if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
            this.innerValue = '';      
            this.inputRef.nativeElement.value = '';
        } 
      }
    );
    this.suggestions$ = this.control.valueChanges
      .debounceTime(500)
      .switchMap((fieldValue: string) => this.typeaheadService.getSuggestons(this.doQuery ,this.source, fieldValue))
      .publishReplay(1).refCount();
  }

}
