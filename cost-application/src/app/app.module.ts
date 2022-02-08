import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/*  app imports **/
import { metaReducers, reducers } from './store/reducers/reducers';
import { UserEffects } from './store/effects/user.effects';
import { DataService } from './services/data/data.service';
import { ExpenseEffects } from './store/effects/expense.effects';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ModulesModule } from './modules/modules.module';

const routes: Routes = [
  // {
  //   // path: 'users',
  //   loadChildren: () =>
  //     import('./modules/modules.module').then((m) => m.ModulesModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    NgbModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
      metaReducers,
    }),
    EffectsModule.forRoot([UserEffects, ExpenseEffects]),
    ModulesModule,
    AuthModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
