import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubscriberComponent} from "./views/subscriber/subscriber.component";
import {SubscriberEnterCodeComponent} from "./views/subscriber-enter-code/subscriber-enter-code.component";
import {SubscriberSignContractComponent} from "./views/subscriber-sign-contract/subscriber-sign-contract.component";
import {SubscriberEnterCodeForSigningComponent} from "./views/subscriber-enter-code-for-signing/subscriber-enter-code-for-signing.component";

const routes: Routes = [
  {path: ':shortUrl', component: SubscriberComponent},
  // {path: '', component: SubscriberComponent},
  {path: 'get_code/:shortUrl', component: SubscriberEnterCodeComponent},
  {path: 'sign_contract/:shortUrl', component: SubscriberSignContractComponent},
  {path: 'signing/:shortUrl', component: SubscriberEnterCodeForSigningComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
