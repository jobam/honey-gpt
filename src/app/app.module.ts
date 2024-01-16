import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';
import { MarkdownModule } from 'ngx-markdown';
import { NavbarTitleComponent } from './navbar-title/navbar-title.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { EffectsModule } from '@ngrx/effects';
import { ChatContentComponent } from './chat/chat-content/chat-content.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import { AppUploadFileComponent } from './app-upload-file/app-upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavbarTitleComponent,
    ButtonsComponent,
    SidebarComponent,
    ChatContentComponent,
    UserDialogComponent,
    AppUploadFileComponent,
  ],
  imports: [
    EffectsModule.forRoot([]),
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
