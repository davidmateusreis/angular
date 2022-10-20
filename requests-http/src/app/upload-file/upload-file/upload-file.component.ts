import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;

    //document.getElementById('customFileLabel')!.innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, 'http://localhost:8000/upload')
        .subscribe(response => console.log('Upload concluído!'));
    }
  }

}
