import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { BookBrowserComponent } from '../../book-browser/book-browser.component';
import { TypographyComponent } from '../../typography/typography.component';
import { BookListComponent } from '../../book-list/book-list.component';
import { BookComponent } from '../../book-list/books/book.component';
import { GoogleBookComponent } from '../../tables/googleBooksDetails/googleBook.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    MatDialogModule,
    NgbModule
  ],
  entryComponents: [
    GoogleBookComponent
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    BookBrowserComponent,
    TypographyComponent,
    BookListComponent,
    BookComponent,
    GoogleBookComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent
  ]
})

export class AdminLayoutModule {}
