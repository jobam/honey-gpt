import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatDataService } from '../services/chat-data.service';
import { ChatService } from '../services/chat.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent {
  title!: string;
  message!: string;

  loginForm = new FormGroup({
    apiKey: new FormControl(this.chatDataService.getAPIKeyFromLocalStore()),
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chatDataService: ChatDataService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.title = this.data.title || 'Default Title';
    this.message = this.data.message || 'Default Message';
  }
  onClose(): void {
    this.dialogRef.close();
  }

  keySubmit(): void {
    if (this.loginForm.valid) {
      this.chatDataService.setAPIKeyToLocalStore(
        this.loginForm.controls.apiKey.value!
      );
      this.chatService.updateConfiguration();
    }
    this.dialogRef.close(this.loginForm.value);
  }
}
