import { Component, OnInit } from '@angular/core';
import {SubscriberService} from "../../service/subscriber.service";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscriberPhone!: string | null;
  user!: {shortUrl: string};

  constructor(
    private subscriberService: SubscriberService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = {
      shortUrl: this.route.snapshot.params['shortUrl']
    }
  }

  onSubmit(): void {
    window.localStorage.setItem('subscriberPhone','89513983455');
    this.subscriberPhone = window.localStorage.getItem('subscriberPhone');

    this.subscriberService.getSms(this.subscriberPhone, this.user.shortUrl).subscribe(data => {
    });

    this.router.navigate(['get_code/' + this.user.shortUrl]);
  }
}
