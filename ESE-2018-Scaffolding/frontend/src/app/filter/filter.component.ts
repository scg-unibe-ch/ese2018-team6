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

  datePostedMin: Date = null;
  startDateMin: Date = null;
  endDateMax: Date = null;

  languages: Array<string> = [];
  postcodes: Array<string> = [];

  workloadMin: number = 0;
  workloadMax: number = 100;
  salaryType: number = null;



  salaryAmountMin: number = 0;


  nextMonth: Date = new Date();

  languagesInput: string = "";
  postcodesInput: string = "";

  @Output() sendFilter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.nextMonth.setMonth(6);
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
    const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let months = [];
    for(let i = 0; i < 13; i++){
      let currentMonth = new Date();
      currentMonth.setMonth(new Date().getMonth() + i);

      months.push(new OptionItem(monthStrings[currentMonth.getMonth()], currentMonth));
      if(i == 0 || i == 12 || currentMonth.getMonth() == 0){
        //add  year to the first item, last item and to every january item
        months[i].label += " " + currentMonth.getFullYear();
      }
    }

    this.startDate = this.startDate.concat(months); //creates a new array instance
    this.endDate = this.endDate.concat(months); //creates a new array instance

    this.startDate.push(new OptionItem("all", null));
    this.endDate.push(new OptionItem("all", null));
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

    this.sendFilter.emit(filterList);
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
