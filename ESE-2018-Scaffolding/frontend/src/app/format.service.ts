import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  /*
  // POSSIBLE APPROACH
  formatDate(datePosted: string) {
    var tmpDate = datePosted.split('.');
    var newDate = new Date(parseInt(tmpDate[2]), parseInt(tmpDate[1]), parseInt(tmpDate[0])+1);

    let dd = newDate.getUTCDate();
    let day = (dd < 10) ? ('0' + dd) : (dd);

    let mm = newDate.getUTCMonth();
    let month = (mm < 10) ? ('0' + mm) : (mm);

    let year = newDate.getFullYear() - 2000;

    return day + '.' + month + '.' + year;
  }
  */

  /**
   *  Formats a standard date to a string DD.MM.YYYY.
   *  Requires a date and returns the string of it.
   *
   *  @param {Date} date        Date to be formatted.
   *  @returns {Date}           Formatted date as string.
   */
  simpleDate(date: Date) {
    // TODO - Proper implementation
    return date;
  }

  /**
   *  Formats the start date to a string DD.MM.YYYY or
   *  returns 'By Arrangement' if nothing was set.
   *  Requires a date and returns the string of it.
   *
   *  @param {Date} date        Date to be formatted.
   *  @returns {any}            Formatted date as string.
   */
  startDate(date: Date) {
    if(date == null){
      return 'By Arrangement'
      // TODO - Proper implementation
    }
    return date;
  }

  /**
   *  Formats the end date to a string DD.MM.YYYY or
   *  returns 'None / Permanent' if nothing was set.
   *  Requires a date and returns the string of it.
   *
   *  @param {Date} date        Date to be formatted.
   *  @returns {any}            Formatted date as string.
   */
  endDate(date: Date) {
    if(date == null){
      return 'None / Permanent'
      // TODO - Proper implementation
    }
    return date;
  }

  /**
   *  Formats a simple string and returns it.
   *  If the string is empty, it returns 'n/a'.
   *  Requires a string.
   *
   *  @param {string} text      String to be formatted.
   *  @returns {string}         Formatted string.
   */
  simpleText(text: string) {
    if(text == null || text == ''){
      return 'n/a';
    } else {
      return text;
    }
  }

  /**
   *  Formats the URL of the company logo and returns it.
   *  Requires URL as string.
   *
   *  @param {string} logo      URL of Logo to be formatted.
   *  @returns {string}         Formatted URL as string.
   */
  logo(logo: string){
    return logo;
  }

  /**
   *  Formats the Website URL of the company and returns it.
   *  Requires URL as string. Returns 'n/a' if nothing was set.
   *  Otherwise it appends 'www.' before the URL.
   *
   *  @param {string} link      URL of website to be formatted.
   *  @returns {string}         Formatted URL as string.
   */
  website(link: string){
    if(link == null){
      return 'n/a';
    } else if(link != null){
      return 'www.' + link;
    }
  }

  /**
   *  Formats the workload according to the set min/max value.
   *  Requires both min/max workload and returns them as a string.
   *
   *  @param {number} wl_min    Workload Minimum to be formatted.
   *  @param {number} wl_max    Workload Maximum to be formatted.
   *  @returns {string}         Formatted workload as string.
   */
  workload(wl_min: number, wl_max: number){
    if(wl_min == wl_max && wl_min != null){
      return wl_min + '%';
    } else if(wl_min != null && wl_max == null){
      return wl_min + '%';
    } else if(wl_min == null && wl_max != null){
      return wl_max + '%';
    } else if(wl_min != null && wl_max != null){
      return wl_min + '-' + wl_max + '%';
    } else if(wl_min == null && wl_max == null){
      return '% negotiable';
    }
  }

  /**
   *  Formats the set languages and returns them as a string.
   *  Requires first and second language set by user (if there are any).
   *
   *  @param {string} fst_lan   First Language to be formatted.
   *  @param {string} sec_lan   Second Language to be formatted.
   *  @returns {string}         Formatted languages as string.
   */
  languages(fst_lan: string, sec_lan: string){
    if(fst_lan == null && sec_lan == null){
      return '-';
    } else if(fst_lan != null && sec_lan != null){
      return fst_lan + ', ' + sec_lan;
    } else if(!this.isEmpty(fst_lan) && this.isEmpty(sec_lan)){
      return fst_lan;
    } else if(this.isEmpty(fst_lan) && !this.isEmpty(sec_lan)){
      return sec_lan;
    }
  }

  /**
   *  Formats the street and house number and returns them as a string.
   *  Requires street and house number set by user.
   *  Street is required while house number is optional.
   *
   *  @param {string} street      Street to be formatted.
   *  @param {string} houseNo     House Number to be formatted.
   *  @returns {string}           Formatted Street/House No. as string.
   */
  street(street: string, houseNo: string){
    if(street == null){
      return 'n/a';
    } else if(street != null && houseNo == null){
      return street;
    } else if(street != null && houseNo != null){
      return street + ' ' + houseNo;
    }
  }

  /**
   *  Formats the postcode and city and returns them as a string.
   *  Requires postcode and city set by user (both required).
   *
   *  @param {number} postcode    Postcode to be formatted.
   *  @param {string} city        City to be formatted.
   *  @returns {string}           Formatted postcode/city as string.
   */
  city(postcode: number, city: string){
    if(postcode == null || city == null){
      return 'n/a';
    } else if(postcode != null && city != null){
      return postcode + ' ' + city;
    }
  }

  /**
   *  Formats the salary type and returns it as a string.
   *  If none was set, it returns a '-'.
   *
   *  @param {string} type         Salary type to be formatted.
   *  @returns {string}            Formatted Salary type.
   */
  salaryType(type: string){
    if(type == null){
      return '-'
    } else if(type != null){
      return type;
    }
  }

  /**
   *  Formats the salary amount and returns it as a string.
   *  If none was set, it returns 'negotiable', also adds CHF to the beginning.
   *
   *  @param {number} amount        Salary amount to be formatted.
   *  @returns {string}             Formatted Salary amount.
   */
  salaryAmount(amount: number){
    if(amount == null){
      return 'negotiable';
    } else if(amount != null){
      return 'CHF ' + amount;
    }
  }

  /**
   *  Adds the css class 'has-error' to the element with the given ID.
   *
   *  @param {string} id            ID of the element to be styled.
   */
  addError(id: string){
    document.getElementById(id).classList.add('has-error');
  }

  /**
   *  Removes the css class 'has-error' from the element with the given ID.
   *
   *  @param {string} id            ID of the element to be styled.
   */
  removeError(id: string){
    document.getElementById(id).classList.remove('has-error');
  }

  /**
   *  Adds the css class 'has-success' to the element with the given ID.
   *
   *  @param {string} id            ID of the element to be styled.
   */
  addSuccess(id: string){
    document.getElementById(id).classList.add('has-success');
  }

  /**
   *  Removes the css class 'has-success' from the element with the given ID.
   *
   *  @param {string} id            ID of the element to be styled.
   */
  removeSuccess(id: string){
    document.getElementById(id).classList.remove('has-success');
  }

  /**
   *  Returns true if a string is null or empty (length smaller than 1)
   *
   *  @param {string} text          String to be analyzed.
   *  @returns {boolean}            True if 'empty'; false otherwise.
   */
  isEmpty(text: string){
    return (text === null || text.length < 1);
  }
}
