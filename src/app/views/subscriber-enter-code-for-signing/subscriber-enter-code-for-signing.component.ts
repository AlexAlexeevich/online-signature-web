import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contract} from "../../models/Contract";
import {SubscriberService} from "../../service/subscriber.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {timer} from "rxjs";

@Component({
  selector: 'app-subscriber-enter-code-for-signing',
  templateUrl: './subscriber-enter-code-for-signing.component.html',
  styleUrls: ['./subscriber-enter-code-for-signing.component.css']
})
export class SubscriberEnterCodeForSigningComponent implements OnInit {
  isShow = false;
  codeForm!: FormGroup;
  subscriberPhone!: string;
  contracts!: Contract[];

  seconds!: number;
  clock: any;

  constructor(
    private subscriberService: SubscriberService,
    private notificationService: NotificationService,
    private router: Router
  )  { }

  ngOnInit(){
    this.clock = timer(0, 1000).subscribe(t => {
      if (this.seconds == 0) {
        this.clock.unsubscribe();
      } else {
        this.seconds = 5 - t;
      }
    });

    this.codeForm = new FormGroup({
      code: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  onSubmit(): void {
    // @ts-ignore
    this.subscriberPhone = window.localStorage.getItem('subscriberPhone');
    this.subscriberService.signContract(this.codeForm.value.code, this.subscriberPhone).subscribe(data => {

    });
    this.isShow = !this.isShow;
  }

}
