import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[StatusDirective]'
})
export class StatusDirective implements OnInit{
  @Input() active = true;
  constructor(private renderer: Renderer2, private elmRef: ElementRef) {}
  ngOnInit() {
    if (!this.active) {
      this.renderer.addClass(this.elmRef.nativeElement, 'table-danger');
    }
  }
}
