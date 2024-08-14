import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private availableLangs = ['en', 'es', 'ca'];

  constructor(private translate: TranslateService) {
    const browserLang = this.translate.getBrowserLang();
    const defaultLang = browserLang && this.availableLangs.includes(browserLang) ? browserLang : 'en';

    this.translate.addLangs(this.availableLangs);
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  setLanguage(lang: string) {
    if (this.availableLangs.includes(lang)) {
      this.translate.use(lang);
    }
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }
}
