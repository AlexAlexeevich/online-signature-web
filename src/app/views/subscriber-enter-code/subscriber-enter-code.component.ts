import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { timer } from 'rxjs';
import {take} from "rxjs/operators";
import {SubscriberService} from "../../service/subscriber.service";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Contract} from "../../models/Contract";

@Component({
  selector: 'app-subscriber-enter-code',
  templateUrl: './subscriber-enter-code.component.html',
  styleUrls: ['./subscriber-enter-code.component.css']
})
export class SubscriberEnterCodeComponent implements OnInit {

  codeForm!: FormGroup;
  subscriberPhone!: string;
  seconds!: number;
  clock: any;
  user!: {shortUrl: string};

  constructor(
              private subscriberService: SubscriberService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute
  )  { }

  ngOnInit(){
    this.user = {
      shortUrl: this.route.snapshot.params['shortUrl']
    };

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
    console.log(this.subscriberPhone);
    console.log(this.codeForm.value.code);
    this.subscriberService.sendCodeFromSubscriber(this.subscriberPhone, this.codeForm.value.code).subscribe((data:Contract[]) => {
      window.localStorage.setItem('contracts', JSON.stringify(data));
      this.router.navigate(['sign_contract/' +  this.user.shortUrl]);
    });
  }
}
