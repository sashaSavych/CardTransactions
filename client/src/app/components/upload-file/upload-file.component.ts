import { Component, ElementRef, ViewChild } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  @ViewChild('fileInput') fileInput: ElementRef<any>;

  constructor(private transactionsService: TransactionsService) { }

  fileChanged(event: Event) {
    const fileToUpload: File =  event.target['files'][0];
    this.fileInput.nativeElement.value = null;

    this.transactionsService.uploadFile(fileToUpload);
  }
}
