import { Sections } from './sections';
import { Component } from '@angular/core';
import { GetSectionsDataService } from './services/getsectionsdata.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-scroll-spy';
  currentSection = 'section1';
  sectionsData: Sections= new Sections();

  constructor(private sanitized: DomSanitizer, getSectionsDataService:GetSectionsDataService){
    getSectionsDataService.getContentData().subscribe(
    data => this.sectionsData = data);
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section:string) {
    document.querySelector('#' + section)?.scrollIntoView({behavior: "smooth"});
  }

  sanitize(sectionData :any){
    return this.sanitized.bypassSecurityTrustHtml(sectionData);
  }
}
