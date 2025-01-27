import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatLabel
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor {
  
  get control(){
    return this.controlDir.control as FormControl;
  }
  constructor(@Self() public controlDir:NgControl){
    this.controlDir.valueAccessor = this;
  }
  
  @Input({required:true}) name!:string;
  @Input() placeholder:string='';
  @Input({required:true}) display!:string;
  @Input() type:string='text';
  @Input() required = false;
  @Input() invalidFeedback = [];
  @Input() validFeedback = '';
  wasTouched = false;
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  

  
}
