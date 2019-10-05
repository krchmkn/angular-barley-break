import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoxComponent } from './box/box.component';
import { UserInputComponent } from './user-input/user-input.component';

import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    UserInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
