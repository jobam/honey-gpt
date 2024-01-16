import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-app-upload-file',
  templateUrl: './app-upload-file.component.html',
  styleUrls: ['./app-upload-file.component.css']
})
export class AppUploadFileComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // Using the file.io API to upload the file
    this.http.post('https://file.io', formData).subscribe(
      (response: any) => {
        console.log(response);
        alert('File uploaded successfully!\n' + response.link);
      },
      (error) => {
        console.error(error);
        alert('Failed to upload the file.');
      }
    );
  }
}
