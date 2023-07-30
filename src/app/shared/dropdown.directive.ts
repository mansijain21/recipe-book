import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective
{
    @HostBinding('class.open') isOpen: boolean = false;
    // binded to class array which contains all the classes & if the variable is true, it is added else not

    /*
    @HostListener('click') toggleDropdown()
    {
        this.isOpen = !this.isOpen;
    }
    // works only when clicked on the dropdown button
    */

    @HostListener('document: click', ['$event']) toggleDropdown( event: Event)
    {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    // closes any open dropdowns if clicked anywhere else in the document or another button (dropdown buttons or else)
    /* 
        checks if the target element of the event === elRef ka element
        if yes, then !isOpen
        if no, => click was done somewhere outside elRef ka element & isOpen = false
    */
    
    constructor(private elRef: ElementRef){}
}

// we need to add "open" class to the dropdown element when clicked first time & remove it when clicked again