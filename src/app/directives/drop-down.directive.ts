import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class DropDownDirective {
  @HostBinding('class') className: any;
  @HostListener('document:click') onClick() {
    this.className = 'open';
  }
}
