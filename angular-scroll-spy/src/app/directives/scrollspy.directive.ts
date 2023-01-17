import { Directive } from '@angular/core';
import { Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scroll-spy]'
})
export class ScrollSpyDirective {

   @Input() public spiedTags:string[] = [];
   @Output() public changeSection = new EventEmitter<string>();
   private currentSection: string='';

   constructor(private elementRef: ElementRef) {}

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        let currSection: string='';
        const children = this.elementRef.nativeElement.children;
        const scrollTop = event.target.scrollTop;
        const parentOffset = event.target.offsetTop;
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
                if ((element.offsetTop - parentOffset) <= scrollTop) {
                  currSection = element.id;
                }
            }
        }
        if (currSection !== this.currentSection) {
            this.currentSection = currSection;
            this.changeSection.emit(this.currentSection);
        }
    }

}
