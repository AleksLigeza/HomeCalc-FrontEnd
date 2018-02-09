import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { SummaryComponent } from './summary/summary.component';
import { HistoryComponent } from './history/history.component';
import { OperationDetailsComponent } from './operation-details/operation-details.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';
import { OperationListComponent } from './operation-list/operation-list.component';
import { CycleMenuComponent } from './cycle-menu/cycle-menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthInterceptorService } from './authInterceptor.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { TruncatePipe } from './trancuatePipe';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    HistoryComponent,
    OperationDetailsComponent,
    DashboardComponent,
    AlertComponent,
    OperationListComponent,
    CycleMenuComponent,
    WelcomeComponent,
    SettingsComponent,
    TruncatePipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pl'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AccountService,
    AlertService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( @Inject(LOCALE_ID) locale: string) {
  }
}
