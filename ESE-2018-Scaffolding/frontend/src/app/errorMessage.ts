export class ErrorMessage {

  constructor(
    /* User */

    /* Company */

    /* Job */
    public titleEmpty: boolean = false,
    public descriptionEmpty: boolean = false,
    public workload: boolean = false,
    public workloadMin: boolean = false,
    public workloadMinEmpty: boolean = false,
    public workloadMinNumber: boolean = false,
    public workloadMinLow: boolean = false,
    public workloadMinHigh: boolean = false,
    public workloadMax: boolean = false,
    public workloadMaxEmpty: boolean = false,
    public workloadMaxNumber: boolean = false,
    public workloadMaxLow: boolean = false,
    public workloadMaxHigh: boolean = false,
    public workloadMaxRange: boolean = false,
    public skillsEmpty: boolean = false,
    public languageEmpty: boolean = false,
    public startDateFormat: boolean = false,
    public endDateFormat: boolean = false,
    public validUntil: boolean = false,
    public validUntilEmpty: boolean = false,
    public validUntilFormat: boolean = false,
    public streetEmpty: boolean = false,
    public postcode: boolean = false,
    public postcodeEmpty: boolean = false,
    public postcodeNumber: boolean = false,
    public postcodeLow: boolean = false,
    public postcodeHigh: boolean = false,
    public cityEmpty: boolean = false,
    public salaryTypeEmpty: boolean = false,

    /* Filter */
    public filter_datePostedFrom: boolean = false,
    public filter_datePostedTo: boolean = false,
    public filter_startDateFrom: boolean = false,
    public filter_startDateTo: boolean = false,
    public filter_endDateFrom: boolean = false,
    public filter_endDateTo: boolean = false,
    public filter_validUntilFrom: boolean = false,
    public filter_validUntilTo: boolean = false,
    public filter_firstLanguage: boolean = false,
    public filter_secondLanguage: boolean = false,
    public filter_postcodeMin: boolean = false,
    public filter_postcodeMax: boolean = false,
    public filter_salaryMin: boolean = false,
    public filter_salaryMax: boolean = false,
    public filter_workloadMin: boolean = false,
    public filter_workloadMax: boolean = false,

    /* General */
  ) {}
}
