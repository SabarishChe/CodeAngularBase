import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[avoidscripttags]'
})
export class inputText {

  regexStr = '^[a-zA-Z0-9.,@/ ]*$';
  // regexStr='^[^<>]+$';

  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: { key: string; }) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: KeyboardEvent) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z.,@/ ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

}