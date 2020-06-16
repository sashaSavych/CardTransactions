import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
  }

  fileChanged(event: Event) {
    const fileToUpload: File =  event.target['files'][0];

    this.transactionsService.uploadFile(fileToUpload);
  }
}
