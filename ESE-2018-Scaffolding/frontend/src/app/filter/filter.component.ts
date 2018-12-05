import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  datePosted: Array<OptionItem> = [];
  startDate: Array<OptionItem> = [];
  endDate: Array<OptionItem> = [];

  datePostedMin: Date = null;
  startDateMin: Date = null;
  endDateMax: Date = null;

  languages: Array<string> = [];
  salaryType: number = 0;
  salaryAmountMin: number = 0;
  workloadMin: number = 0;
  workloadMax: number = 0;

  nextMonth: Date = new Date();

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
    let all = new Date();
    all.setFullYear(1990);


    this.datePosted.push(new OptionItem("this week", thisWeek),
      new OptionItem("this month", thisMonth),
      new OptionItem("all",null));

    //startDatum / endDatum
    const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let months = [];
    for(let i = 0; i < 13; i++){
      let currentMonth = new Date();
      currentMonth.setMonth(new Date().getMonth() + i);

      months.push(new OptionItem(monthStrings[currentMonth.getMonth()] + " " + currentMonth.getFullYear(), currentMonth));
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

  consoleLog(){
    window.alert(this.datePostedMin.toString());
  }

  /**
   * sends a filter request from the given filter data
   */
  filter(){
    let filterList = [];
    if(this.datePostedMin.toString() != "null"){
      this.datePostedMin = new Date(this.datePostedMin);
      let datePostedMax = new Date();
      datePostedMax.setFullYear(2050);
      filterList.push(
        this.createFilterObject("datePosted","minDate",this.datePostedMin.getTime(),
        "maxDate", datePostedMax.getTime())
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

class OptionItem {
  label: String = '';
  date: Date = new Date();
  constructor(label: string, date: Date) {
    this.date = date;
    this.label = label;
  };
}
class Filter{
  filter: String = '';
  constructor(filter: string){
    this.filter = filter;
  }
}
