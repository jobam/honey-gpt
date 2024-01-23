import {Component, EventEmitter, Input, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-upload-file',
  templateUrl: './app-upload-file.component.html',
  styleUrls: ['./app-upload-file.component.css']
})
export class AppUploadFileComponent {
  selectedFile: File | null = null;
  isBusy = false;
  @Input() disabled = false;
  @Output() uploaded:EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    this.uploadFile();
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('autoDelete', 'true');
    this.isBusy = true;

    // Using the file.io API to upload the file
    this.http.post('https://file.io', formData).subscribe(
      (response: any) => {
        console.log(response);
        this.uploaded.emit(response.link);
        this.isBusy = false;
      },
      (error) => {
        console.error(error);
        alert('Failed to upload the file.');
        this.isBusy = false;
      }
    );
  }
}
