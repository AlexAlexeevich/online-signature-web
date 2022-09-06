import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {errorInterceptorProvider} from "./helper/error-interceptor.service";
import { SubscriberComponent } from './views/subscriber/subscriber.component';
import { SubscriberEnterCodeComponent } from './views/subscriber-enter-code/subscriber-enter-code.component';
import { SubscriberSignContractComponent } from './views/subscriber-sign-contract/subscriber-sign-contract.component';
import { PdfViewerModule} from "ng2-pdf-viewer";
import { SubscriberEnterCodeForSigningComponent } from './views/subscriber-enter-code-for-signing/subscriber-enter-code-for-signing.component';
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [
    AppComponent,
    SubscriberComponent,
    SubscriberEnterCodeComponent,
    SubscriberSignContractComponent,
    SubscriberEnterCodeForSigningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [errorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
