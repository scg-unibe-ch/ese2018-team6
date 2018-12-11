import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {current} from 'codelyzer/util/syntaxKind';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  datePosted: Array<OptionItem> = [];
  startDate: Array<OptionItem> = [];
  endDate: Array<OptionItem> = [];
  salaryTypeArray = [
    new OptionItem("all",null),
    new OptionItem("monthly",0),
    new OptionItem("hourly",1),
    new OptionItem("one time payment",2),
  ];

  workloadOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 5,
    minRange: 5,
    translate: (value: number): string => {
      return value + '%';
    }
  };
  salaryAmountOptions: Options = {
    floor: 0,
    ceil: 10000,
    step: 10,
    minRange: 10,
    translate: (value: number): string => {
      return value + ' CHF';
    }
  }

  languagesInput: string = "";
  postcodesInput: string = "";


  datePostedMin: Date = null;
  startDateMin: Date = null;
  endDateMax: Date = null;

  languages: Array<string> = [];
  postcodes: Array<string> = [];

  workloadMin: number = 0;
  workloadMax: number = 100;
  salaryType: number = null;

  salaryAmountMin: number = 0;
  salaryAmountMax: number = 10000;





  @Output() sendFilter: EventEmitter<any> = new EventEmitter();
  @Output() cancelFilter: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    this.initializeOptionItemArrays();
  }

  /**
   * initializes the optionItem arrays, which are then filled into the select elements
   */
  initializeOptionItemArrays(){
    //datePosted
    let thisWeek = new Date();
    thisWeek.setDate(new Date().getDate() - 7);
    let thisMonth = new Date();
    thisMonth.setMonth(new Date().getMonth() - 7);


    this.datePosted.push(new OptionItem("this week", thisWeek),
      new OptionItem("this month", thisMonth),
      new OptionItem("all",null));

    //startDatum / endDatum
    this.fillDateSelect("startDate");
    this.fillDateSelect("endDate");
  }

  /**
   *  fills the specified variable with OptionItem objects. It depends on the date selected in the other select.
   */
  adaptDateSelect(variable: string){
    let monthsToAdd = 0;
    if(variable == "endDate") {
      if(this.startDateMin){
       // monthsToAdd = (new Date(this.startDateMin).getTime() - new Date()).getTime());
      }
    } else if (variable == "startDate"){
      if(this.endDateMax){
        //monthsToAdd = new Date(this.endDateMax).getMonth() - new Date().getMonth();
      }
    }
    console.log(monthsToAdd);
    //this.fillDateSelect(variable,monthsToAdd);
  }

  /**
   * fills the specified variable with OptionItem objects.
   *
   * @param variable: startDate or endDate
   * @param monthsToAdd: how many (constant) months should be added/subtracted if negative to every item (optional)
   */
  fillDateSelect(variable:string, monthsToAdd: number = 0){
    const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let months = [];
    for(let i = 0; i < 13; i++){
      let currentMonth = new Date();
      currentMonth.setMonth(new Date().getMonth() + i + monthsToAdd);

      months.push(new OptionItem(monthStrings[currentMonth.getMonth()], currentMonth));
      if(i == 0 || i == 12 || currentMonth.getMonth() == 0){
        //add  year to the second item (first month after "all"-entry, last item and to every january item
        months[i].label += " " + currentMonth.getFullYear();
      }
    }
    months.push(new OptionItem("all",null));

    this[variable] = months;
  }
  /**
   * removes the specified item from the specified array. Does only delete the first occurrence
   * @param array
   * @param item
   */
  removeItemFromArray(array: string, item: string){
    const index = this[array].indexOf(item);
    if (index > -1) {
      this[array].splice(index, 1);
    }
  }

  /**
   * adds the value (= value of the variable of the model, specified by paramenter input) of the textbox to the specified array, but only if it does not exist.
   *
   * @param array
   * @param input
   */
  addItemToArray(array: string, input: string){
    const index = this[array].indexOf(this[input]);
    if (index == -1) {
      this[array].push(this[input]);
    }
    this[input] = "";
  }

  /**
   * resets all filters to the initial/default state
   */
  reset(){
    this.datePostedMin = null;
    this.startDateMin = null;
    this.endDateMax = null;

    this.languages = [];
    this.postcodes = [];

    this.workloadMin = 0;
    this.workloadMax = 100;
    this.salaryType = null;

    this.salaryAmountMin = 0;
    this.salaryAmountMax = 10000;

    //reset also the text box content
    this.languagesInput = "";
    this.postcodesInput = "";
  }

  /**
   * sends a filter request from the given filter data
   */
  filter(){
    let filterList = [];
    //datePosted
    if(this.datePostedMin != null && this.datePostedMin.toString() != "null"){
      this.datePostedMin = new Date(this.datePostedMin);
      let datePostedMax = new Date();
      datePostedMax.setFullYear(2050);
      filterList.push(
        this.createFilterObject("datePosted","minDate",this.datePostedMin.getTime(),
        "maxDate", datePostedMax.getTime())
      );
    }
    //startDate
    if(this.startDateMin != null && this.startDateMin.toString() != "null"){
      this.startDateMin = new Date(this.startDateMin);
      let startDateMax = new Date();
      startDateMax.setFullYear(2050);
      filterList.push(
        this.createFilterObject("startDate","minDate",this.startDateMin.getTime(),
          "maxDate", startDateMax.getTime())
      );
    }
    //endDate
    if(this.endDateMax != null && this.endDateMax.toString() != "null"){
      this.endDateMax = new Date(this.endDateMax);
      let endDateMin = new Date();
      endDateMin.setFullYear(1990);
      filterList.push(
        this.createFilterObject("endDate","minDate",endDateMin.getTime(),
          "maxDate", this.endDateMax.getTime())
      );
    }
    //languages
    if(this.languages.length > 0){
      filterList.push(
        this.createFilterObject("language","languages",this.languages)
      );
    }
    //postcodes
    if(this.postcodes.length > 0){
      filterList.push(
        this.createFilterObject("postcode","postcodes",this.postcodes)
      );
    }
    //workload
    if(this.workloadMin > 0 || this.workloadMax < 100){
      let minWorkload = this.workloadMin == 0 ? 1 : this.workloadMin; //avoid 0 as minimum value.
      filterList.push(
        this.createFilterObject("workload","minWorkload",minWorkload,
          "maxWorkload",this.workloadMax)
      );
    }
    //salaryType
    if(this.salaryType != null){
      filterList.push(
        this.createFilterObject("salaryType","salaryType",this.salaryType)
      );
    }
    //salaryAmount
    if(this.salaryAmountMin != this.salaryAmountOptions.floor || this.salaryAmountMax != this.salaryAmountOptions.ceil){
      let minSalaryAmount = this.salaryAmountMin == 0 ? 1 : this.salaryAmountMin; //avoid 0 as minimum value.
      filterList.push(
        this.createFilterObject("salaryAmount","minSalaryAmount",minSalaryAmount,
          "maxSalaryAmount", this.salaryAmountMax)
      );
    }

    this.sendFilter.emit(filterList);
  }

  /**
   * tells the parent container to quit filter mode and show the normal job list
   */
  cancel(){
    this.cancelFilter.emit();
  }

  /**
   * helper methods which returns a filter request with the given arguments for the filter request
   * @param filterType - filter type, e.g. "datePosted" or "postcode"
   * @param firstPropName - name of the first property
   * @param fistPropValue - value of the first property
   * @param secondPropName - name of the second property, optional
   * @param secondPropValue - value of the second property, optional
   *
   * @returns filter object according to the arguments given
   */
  createFilterObject(filterType: string, firstPropName: any, firstPropValue: any, secondPropName: any = null, secondPropValue: any = null){
    let filter = new Filter(filterType);
    filter[firstPropName] = firstPropValue;
    if(secondPropName && secondPropValue){
      filter[secondPropName] = secondPropValue;
    }
    console.log(filter);
    return filter;
  }

}

/**
 * each OptionItem can be used for one dropdown item.
 */
class OptionItem {
  label: string = '';
  value: any = null;

  /**
   * use this constructor to instantiate a new OptionItem object.
   * @param label: text shown in the dropdown items
   * @param value: for date/number dropdowns, the Date/number value
   */
  constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  };
}
class Filter{
  filter: String = '';
  constructor(filter: string){
    this.filter = filter;
  }
}
