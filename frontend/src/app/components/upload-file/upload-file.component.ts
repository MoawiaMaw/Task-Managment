import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'rejectionReason'];

  uploadedFile!: File;
  data: any = [];
  acceptedData: any = [];
  rejectedData: any = [];
  errors: any = [];
  dataSource = new MatTableDataSource<any>(this.rejectedData);

  private paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;

    if (this.paginator) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private router: Router, private toastr: ToastrService, private tasksService: TasksService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  async onChange(e: any) {
    // Fetching and reading the uploaded file data from the input to convert it to Json Object 
    this.uploadedFile = e.target.files[0];
    let p: any = document.getElementById('form-p');
    p.innerText = this.uploadedFile.name;

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.uploadedFile);
    fileReader.onload = async (e) => {
      const workbook = XLSX.read(fileReader.result, { type: 'binary' });
      const SheetNames = workbook.SheetNames;

      this.data = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]]);
      await this.validateUploadedData(this.data);
    };
  }

  async validateUploadedData(data: any) {

    const keys = ['title', 'description']; // the keys to search for (VALID KEYS)
    let errorOccured = false;

    data.forEach((element: any) => {
      Object.keys(element).forEach((key) => {
        // Checking for possible invalid scenarios - Invalid key or valid key without a data 
        if (
          !keys.includes(key) ||
          !element[key] ||
          Object.keys(element).length !== 2
        ) {
          errorOccured = true;
        }
      });
      if (!errorOccured) {
        this.acceptedData.push(element);
      } else {
        this.rejectedData.push(element);
      }
      errorOccured = false;
    });
  }

  validateInput() { // Validation to disable/enable upload button
    if ((this.acceptedData && this.acceptedData.length > 0)) {
      return true;
    }
    return false;
  }

  upload() { // Service to upload the Valid data from the uploaded file
    this.tasksService.createMany(this.acceptedData).subscribe({
      next: (resp: any) => {
        this.acceptedData = [];
        this.toastr.success('Uploaded the tasks sucessfully');
        if(!this.rejectedData || this.rejectedData.length === 0)
          this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.toastr.error(error.error.error)
      }
    });
  }

  downloadFile() {
    const fileName = 'RejectedData.xlsx';
    
    // Initialization of the file
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rejectedData);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    //Writing the data the excel sheet 
    XLSX.writeFile(workbook, fileName);
    this.rejectedData = [];
    this.toastr.success('Excel File Downloaded..')

    if (!this.acceptedData || this.acceptedData.length === 0)
      this.router.navigate(['/']);
  }
}
