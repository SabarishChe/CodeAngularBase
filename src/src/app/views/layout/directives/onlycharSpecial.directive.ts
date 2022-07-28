import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[nameOnly]'
})
export class onlycharSpecialCharacter {

  regexStr = '^[a-zA-Z. ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) { }


  @HostListener('keypress', ['$event']) onKeyPress(event: { key: string; }) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    // this.validateFields(event); // Commented Due To Space BW Sentences
  }

  validateFields(event: { preventDefault: () => void; }) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z. ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

}