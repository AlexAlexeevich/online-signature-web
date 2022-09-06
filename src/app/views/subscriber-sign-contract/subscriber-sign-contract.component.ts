import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {createComponent} from "@angular/compiler/src/core";
import {SubscriberService} from "../../service/subscriber.service";
import {NotificationService} from "../../service/notification.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileData} from "../../models/FileData";
import { saveAs } from 'file-saver';
import {Contract} from "../../models/Contract";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-subscriber-sign-contract',
  templateUrl: './subscriber-sign-contract.component.html',
  styleUrls: ['./subscriber-sign-contract.component.css']
})
export class SubscriberSignContractComponent implements OnInit {

  subscriberPhone!: string | null;
  codeForm!: FormGroup;
  contracts: Contract[] = [];
  user!: {shortUrl: string};

  fileList?: FileData;



  constructor(
    private subscriberService: SubscriberService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contracts = JSON.parse(<string>window.localStorage.getItem('contracts') || '[]');
  }

  ngOnInit(): void {
    this.user = {
      shortUrl: this.route.snapshot.params['shortUrl']
    };
    this.codeForm = new FormGroup({
      subscriberEmail: new FormControl('', Validators.compose([Validators.required]))
    })
  }

  openPdf(id: number): void {
    console.log("openPdf "+ id);
    this.subscriberService.openContract(id).subscribe((data: any) => {
        //window.open('http://localhost:8080/api/subscriber/open_contract/' + id);
      saveAs(new Blob([data], { type: 'application/pdf'}));
      // let file = new Blob([data],{ type: 'application/pdf'})
      // let fileURL = URL.createObjectURL(file);
      //   window.open(fileURL);
      //   let a         = document.createElement('a');
      //   a.href        = fileURL;
      //   a.target      = '_blank';
      //   a.download    = 'bill.pdf';
      //   document.body.appendChild(a);
      //   a.click();
      },
      (error) => {
        console.log('getPDF error: ',error);
      }
    );

////////////////////////////////////////////////////////////////////////////
 //   window.open('http://localhost:8080/api/subscriber/open_contract/1')//////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    // this.subscriberService.openContract(this.id).subscribe((data) => {
    //   let file = new Blob([data], {type: 'application/pdf'});
    //   let fileURL = URL.createObjectURL(file);
    //   // this.pdfViewer?.nativeElement.data = fileURL;
    //   window.open(fileURL);
    // })


    // this.subscriberService.openContract(pdfSrc).subscribe(data =>
    //   saveAs(data, this.contracts[0]));

  }

  onSubmit(): void {
    this.subscriberPhone = window.localStorage.getItem('subscriberPhone');
    this.subscriberService.getSmsForSign(this.subscriberPhone, this.codeForm.value.subscriberEmail).subscribe(data => {
    });
    this.router.navigate(['signing/' + this.user.shortUrl]);
  }
}
