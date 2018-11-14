import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  /*
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

  simpletext(text: string) {
    if(text == null || text == ''){
      return 'n/a';
    } else {
      return text;
    }
  }

  dateProvisional(date: string){
    if(date == null){
      return '-';
    } else if(date != null){
      return date;
    }
  }

  logo(logo: string){
    return logo;
  }

  website(link: string){
    if(link == null){
      return 'n/a';
    } else if(link != null){
      return 'www.' + link;
    }
  }

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
      return 'negotiable';
    }
  }

  language(fst_lan: string, sec_lan: string){
    if(fst_lan == null && sec_lan == null){
      return '-';
    } else if(fst_lan != null && sec_lan != null){
      return fst_lan + ', ' + sec_lan;
    } else if(fst_lan != null && sec_lan == null){
      return fst_lan;
    } else if((fst_lan == null) && sec_lan != null){
      return sec_lan;
    }
  }

  street(street: string, houseNo: string){
    if(street == null){
      return 'n/a';
    } else if(street != null && houseNo == null){
      return street;
    } else if(street != null && houseNo != null){
      return street + ' ' + houseNo;
    }
  }

  city(postcode: number, city: string){
    if(postcode == null || city == null){
      return 'n/a';
    } else if(postcode != null && city != null){
      return postcode + ' ' + city;
    }
  }

  salaryType(type: string){
    if(type == null){
      return '-'
    } else if(type != null){
      return type;
    }
  }

  salaryAmount(amount: number){
    if(amount == null){
      return 'negotiable';
    } else if(amount != null){
      return 'CHF ' + amount;
    }
  }
}
