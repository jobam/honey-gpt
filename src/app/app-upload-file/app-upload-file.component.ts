import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-app-upload-file',
  templateUrl: './app-upload-file.component.html',
  styleUrls: ['./app-upload-file.component.css']
})
export class AppUploadFileComponent {
  selectedFile: File | null = null;
  isBusy = false;
  @Input() disabled = false;
  @Output() uploaded: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    this.convertToBase64();
  }

  convertToBase64(): void {
    if (!this.selectedFile) {
      return;
    }

    this.isBusy = true;

    // Create an image element
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Compress the image and get its base64 representation
      // You can adjust the quality parameter between 0 and 1 here
      // We are assuming JPEG compression here, change mimeType if needed
      const mimeType = 'image/jpeg';
      const quality = 0.5;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      // Emit the base64 string of the compressed image
      console.log(dataUrl);
      this.uploaded.emit(dataUrl);
      this.isBusy = false;
    };
    img.onerror = () => {
      alert('Failed to read the file.');
      this.isBusy = false;
    };

    // Set the img src to the selectedFile using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('Failed to read the file.');
      this.isBusy = false;
    };

    reader.readAsDataURL(this.selectedFile);
  }
}
