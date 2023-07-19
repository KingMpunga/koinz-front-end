export interface EmailValidatorErrors {
    email?: boolean;
  }
  
  export interface NotEmptyValidatorErrors {
    notEmpty?: boolean;
  }
  
  export interface MinimumWordsValidatorErrors {
    minValue?: number;
  }
  
  export interface AlsoRequireValidatorErrors {
    alsoRequired?: boolean;
    alsoRequiredFieldName?: string;
  }
  
  export interface PhoneNumberValidatorErrors {
    phoneNumber?: boolean;
  }
  
  export interface MustMatchValidatorErrors {
    mustMatch?: boolean;
  }
  
  export interface PasswordStrengthValidatorErrors {
    passwordStrength?: boolean;
    passwordLength?: number;
  }