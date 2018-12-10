export class ErrorMessage {

  constructor(
    /* User */
    public userEmailEmpty: boolean = false,
    public userPasswordEmpty: boolean = false,
    public userConfirmPassword: boolean = false,
    public userConfirmPasswordEmpty: boolean = false,
    public userPasswordsNotEqual: boolean = false,

    /* Company */
    public companyNameEmpty: boolean = false,
    public companyDescriptionEmpty: boolean = false,
    public companyStreetEmpty: boolean = false,
    public companyPostcode: boolean = false,
    public companyPostcodeEmpty: boolean = false,
    public companyPostcodeNumber: boolean = false,
    public companyPostcodeNumberLow: boolean = false,
    public companyPostcodeNumberHigh: boolean = false,
    public companyCityEmpty: boolean = false,
    public companyContactNameEmpty: boolean = false,

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
  ) {}
}
