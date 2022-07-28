import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[numberOnly]'
})
export class onlynumberSpecialCharacter {

  regexStr = '^[0-9. ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: { key: string; }) {
    return new RegExp(this.regexStr).test(event.key);
  }

  // @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
  //   this.validateFields(event);
  // }

  // validateFields(event) {
  //   setTimeout(() => {

  //     this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z. ]/g, '').replace(/\s/g, '');
  //     event.preventDefault();

  //   }, 100)
  // }

  @HostListener('paste', ['$event']) paste(event: KeyboardEvent) {
    this.validateFields(event);
  }
  validateFields(event: KeyboardEvent) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9. ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

}