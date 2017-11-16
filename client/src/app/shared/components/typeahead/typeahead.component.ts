import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, forwardRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AscentsService } from 'app/services/ascents.service';
import * as _ from 'lodash';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TypeaheadComponent),
  multi: true
};

interface suggestionHighlighted {
  full: string;
  begin: string;
  middle: string;
  end: string;
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
  @ViewChild('input') inputRef: ElementRef;
  private innerValue: string = '';
  private showDropdown: boolean = false;
  suggestions: any[] = [];
  suggestionsHighlighted: suggestionHighlighted[];

  constructor(private ascentsService: AscentsService) { }

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
    this.innerValue = value;
    this.suggestions = [];
    this.showDropdown = false;
    this.propagateChange(this.innerValue);
}

  ngAfterViewInit(){ }

  query(value: string) {
    return this.ascentsService.queryAscents(value);
  }

  fillTextBox(value: string) {
    this.inputRef.nativeElement.value = value;
    this.innerValue = value;
    this.propagateChange(value);
    this.showDropdown = false;
  }

  highlightMatches() {
    let suggestionsHighlighted: suggestionHighlighted[] = [];
    let suggestionsNameList = this.suggestions.map(suggestion => suggestion.name);
    suggestionsNameList.forEach((suggestion: string) => {
      let suggestionSplitted = suggestion.split(this.innerValue);
      suggestionSplitted.splice(1, 0, this.innerValue);
      let suggestionHighlighted: suggestionHighlighted = {
        full: '',
        begin: '',
        middle: '',
        end: ''
      };
      suggestionHighlighted.full = suggestion;
      suggestionHighlighted.begin = suggestionSplitted[0];
      suggestionHighlighted.middle = suggestionSplitted[1];
      suggestionHighlighted.end = suggestionSplitted[2];
      suggestionsHighlighted.push(suggestionHighlighted);
    });
    this.suggestionsHighlighted = suggestionsHighlighted;
  }

  suggest() {
    return this.control.valueChanges
    .debounceTime(500)
    .filter((fieldValue: string) => fieldValue.length > 0)
    .filter((fieldValue: string) => _.map(this.suggestions, 'name').indexOf(fieldValue) === -1) // not calling API if suggestions name array contains field value 
    .switchMap((fieldValue: string) => this.query(fieldValue))
    .subscribe(result => {
      if (result.payload) {
        this.suggestions = result.payload;
        this.showDropdown = true;
        this.highlightMatches();
      } else {
        this.suggestions = [];
        this.showDropdown = false;
      }
    });
  }

  ngOnInit() {
    if(this.placeHolder === undefined){
      this.placeHolder = 'Enter ' + this.text; 
    }
    this.control.valueChanges.subscribe(() => {
        if (this.control.value == '' || this.control.value == null || this.control.value == undefined) {
            this.innerValue = '';      
            this.inputRef.nativeElement.value = '';
            this.showDropdown = false;              
        } 
      }
    );
    this.suggest();
  }

}
