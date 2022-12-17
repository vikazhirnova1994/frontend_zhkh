import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

export interface IExtendedAbstractControl {
  label?: string;
  name: string;
  icon?: string;
  placeholder?: string;
  validation?: {} ;
  errorMessages?: Array<string>;

}

export class FormControlModel extends FormControl implements IExtendedAbstractControl {
  label?: string;
  name: string;
  icon?: string;
  placeholder?: string;
  validation?: { }  ;
  errorMessages?: Array<string>;

  private sub: Subscription;
  private debounce = 500;

  constructor(config : IExtendedAbstractControl, formState: any = null,
              validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {

    super(formState, validatorOrOpts, asyncValidator);

    this.label = config.label;
    this.name = config.name;
    this.icon = config.icon;
    this.placeholder = config.placeholder;
    this.validation = config.validation;

    this.sub = this.valueChanges.pipe(
      debounceTime(this.debounce)
    ).subscribe(() => {
      this.errorMessages = [];

      if (this.errors && this.dirty) {

        Object.keys(this.errors).forEach((key) => {
          console.log(key);
          // @ts-ignore
          console.log(this.validation[key]);
          // @ts-ignore
          if (this.validation[key]) {
            // @ts-ignore
            this.errorMessages?.push(this.validation[key])
          }
        });
      }
    });
  }
  public unsubscribe(): void {
    this.sub.unsubscribe();
  }
}
