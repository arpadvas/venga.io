import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ServerResponse } from '../../../models/server-response.model';

@Component({
  selector: 'app-prof-desc',
  templateUrl: './prof-desc.component.html',
  styleUrls: ['./prof-desc.component.css']
})
export class ProfDescComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Input() gender: string;
  @Input() country: string;
  showDescriptionPencil: boolean = false;
  editDescription: boolean = false;
  descriptionEdited: string;
  showGenderPencil: boolean = false;
  editGender: boolean = false;
  genderEdited: string;
  genders: string[] = ['male', 'female'];
  showCountryPencil: boolean = false;
  editCountry: boolean = false;
  countryEdited: string;
  countries: string[] = ['Afghanistan','Albania','Algeria','Andorra','Angola','Anguilla','Antigua &amp; Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia &amp; Herzegovina','Botswana','Brazil','British Virgin Islands','Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Cape Verde','Cayman Islands','Chad','Chile','China','Colombia','Congo','Cook Islands','Costa Rica','Cote D Ivoire','Croatia','Cruise Ship','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Polynesia','French West Indies','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guam','Guatemala','Guernsey','Guinea','Guinea Bissau','Guyana','Haiti','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kuwait','Kyrgyz Republic','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macau','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Mauritania','Mauritius','Mexico','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Namibia','Nepal','Netherlands','Netherlands Antilles','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Norway','Oman','Pakistan','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Puerto Rico','Qatar','Reunion','Romania','Russia','Rwanda','Saint Pierre &amp; Miquelon','Samoa','San Marino','Satellite','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','South Africa','South Korea','Spain','Sri Lanka','St Kitts &amp; Nevis','St Lucia','St Vincent','St. Lucia','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor, LEste','Togo','Tonga','Trinidad &amp; Tobago','Tunisia','Turkey','Turkmenistan','Turks &amp; Caicos','Uganda','Ukraine','United Arab Emirates','United Kingdom','Uruguay','Uzbekistan','Venezuela','Vietnam','Virgin Islands (US)','Yemen','Zambia','Zimbabwe'];
  filteredCountriesSingle: any[];
  @Output() processing = new EventEmitter<boolean>();
  @Output() profileUpdated = new EventEmitter<ServerResponse>();

  constructor(private profileService: ProfileService) { }

  saveChanges(updated) {
    this.processing.emit(true);
    this.profileService.updateProfile(updated).subscribe((res: ServerResponse) => {
      console.log(res);
      this.processing.emit(false);
      this.profileUpdated.emit(res);
    });
  }

  showEditDescription() {
    this.editDescription = true;
    this.descriptionEdited = this.description;
  }

  saveDescription() {
    this.editDescription = false;
    this.showDescriptionPencil = false;
    this.description = this.descriptionEdited;
    const description = {
      description: this.descriptionEdited
    };
    this.saveChanges(description);
  }

  showEditGender() {
    this.editGender = true;
    this.genderEdited = this.gender;
  }

  saveGender() {
    this.editGender = false;
    this.showGenderPencil = false;
    this.gender = this.genderEdited;
    const gender = {
      gender: this.genderEdited
    };
    this.saveChanges(gender);
  }

  showEditCountry() {
    this.editCountry = true;
    this.countryEdited = this.country;
  }

  saveCountry() {
    this.editCountry = false;
    this.showCountryPencil = false;
    this.country = this.countryEdited;
    const country = {
      country: this.countryEdited
    };
    this.saveChanges(country);
  }

  filterCountrySingle(event) {
    let query = event.query;        
    this.filteredCountriesSingle = this.filterCountry(query, this.countries);
  }

  filterCountry(query, countries: any[]):any[] {
    let filtered : any[] = [];
    for(let i = 0; i < countries.length; i++) {
        let country = countries[i];
        if(country.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            filtered.push(country);
        }
    }
    return filtered;
}

  ngOnInit() {
  }

}
