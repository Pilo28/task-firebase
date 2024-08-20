import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service'; 
import { I18nService } from '../../../core/services/i18n/i18n.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private i18nService = inject(I18nService);

  changeLanguage(lang: string) {
    this.i18nService.setLanguage(lang);
  }
 
  logout() {
    this.authService.logout();
  }
  
}
