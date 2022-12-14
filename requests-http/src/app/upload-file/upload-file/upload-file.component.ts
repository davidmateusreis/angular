import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { filterResponse, UploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress = 0

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

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          UploadProgress(progress => {
            console.log(progress);
            this.progress = progress; // função de callback
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload concluído!'));
      // .subscribe((event: HttpEvent<Object>) => {
      //   console.log(event);
      //   if (event.type === HttpEventType.Response) {
      //     console.log('Upload concluído!');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100) / (event.total ?? 1));
      //     console.log('Progresso', percentDone);
      //     this.progress = percentDone;
      //   }

      // });
    }
  }

  onDownloadExcel() {
    this.uploadFileService.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'jogos.xlsx')
      });
  }

  onDownloadPDF() {
    this.uploadFileService.download(environment.BASE_URL + '/downloadPDF')
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'otherside.pdf')
      });
  }

}
