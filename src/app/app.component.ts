import { Component } from '@angular/core';
import { GetApiService } from './api-get-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  editRecord = false;
  title = 'Angular CRUD Operations';
  apiData: any = [];
  item: any = {};
  titleField: any;
  authorField: any;
  editIDNumber: any;

  constructor(private ApiFuncClass: GetApiService) {}

  callGetApi() {
    this.ApiFuncClass.apiCall().subscribe((data) => (this.apiData = data));
  }

  ngOnInit() {
    this.callGetApi();
  }

  titleFieldData(e: any) {
    this.titleField = e.target.value;
  }
  authorFieldData(e: any) {
    this.authorField = e.target.value;
  }
  async deleteRecord(id: number) {
    this.ApiFuncClass.deleteRecord(id).subscribe((data) => this.callGetApi());
  }
  EditRecord(id: number) {
    this.editRecord = true;
    this.ApiFuncClass.getEditRecord(id).subscribe((data) => {
      this.titleField = data['title'];
      this.authorField = data['author'];
      this.editIDNumber = data['id'];
    });
  }
  clearForm() {
    this.titleField = '';
    this.authorField = '';
  }
  async onFormSubmit() {
    if (this.editRecord) {
      this.ApiFuncClass.editRecord({
        id: this.editIDNumber,
        title: this.titleField,
        author: this.authorField,
      }).subscribe((data) => {
        this.callGetApi();
        this.clearForm();
        this.editRecord = false;
      });
    } else {
      this.ApiFuncClass.createRecord({
        title: this.titleField,
        author: this.authorField,
      }).subscribe((data) => this.callGetApi());
      this.clearForm();
    }
  }
}
