import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StudentService } from '../Services/student.service';
import { Student } from '../Models/Student';
import { PercentagePipe } from '../Pipes/percentage.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    UpperCasePipe,
    CurrencyPipe,
    DatePipe,
    PercentagePipe,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  studentService: StudentService = inject(StudentService);

  isEditing: boolean = false;
  isInserting: boolean = false;
  stdIdToEdit: number;

  students: Student[];
  totalMarks: number;

  filterText: string = 'All';

  searchBoxClasses: boolean = true;

  totalStudents = new Promise((resolve, rejection) => {
    setTimeout(() => {
      resolve(this.studentService.students.length);
    }, 2000);
  });

  //PROPERTIES FOR INSERTING
  @ViewChild('name') Name: ElementRef;
  @ViewChild('gender') Gender: ElementRef;
  @ViewChild('dob') Dob: ElementRef;
  @ViewChild('course') Course: ElementRef;
  @ViewChild('marks') Marks: ElementRef;
  @ViewChild('fee') Fee: ElementRef;

  //PROPERTIES FOR EDITING
  @ViewChild('editName') editName: ElementRef;
  @ViewChild('editGender') editGender: ElementRef;
  @ViewChild('editDob') editDob: ElementRef;
  @ViewChild('editCourse') editCourse: ElementRef;
  @ViewChild('editMarks') editMarks: ElementRef;
  @ViewChild('editFee') editFee: ElementRef;

  ngOnInit() {
    this.students = this.studentService.filterStudentByGender(this.filterText);
    this.totalMarks = this.studentService.totalMarks;
  }

  onFilterValueChanged(event: any) {
    this.filterText = event.target.value;
    this.students = this.studentService.filterStudentByGender(this.filterText);
    this.totalStudents = new Promise((resolve, rejection) => {
      resolve(this.students.length);
    });
  }

  back(searchBox: HTMLInputElement) {
    this.searchBoxClasses = true;
    searchBox.placeholder = 'Search By Name';

    this.students = this.studentService.filterStudentByGender(this.filterText);

    this.totalStudents = new Promise((resolve, rejection) => {
      resolve(this.students.length);
    });
  }

  filterStudentByName(searchBox: HTMLInputElement) {
    if (searchBox.value != '') {
      this.searchBoxClasses = true;
      searchBox.placeholder = 'Search By Name';

      this.students = this.studentService.filterStudentByGender(
        this.filterText
      );
      this.students = this.students.filter((student) => {
        return student.name
          .toLowerCase()
          .includes(searchBox.value.toLowerCase());
      });

      searchBox.value = '';

      this.totalStudents = new Promise((resolve, rejection) => {
        resolve(this.students.length);
      });
    } else {
      searchBox.placeholder = 'Error: Enter Value';
      this.searchBoxClasses = false;
    }
  }

  OnInsertClicked() {
    this.isInserting = true;
  }
  OnInsertCancelled() {
    this.isInserting = false;
  }
  OnInsertSaved() {
    if (
      this.Name.nativeElement.value &&
      this.Dob.nativeElement.value &&
      this.Marks.nativeElement.value &&
      this.Fee.nativeElement.value
    ) {
      this.studentService.CreateStudent(
        this.Name.nativeElement.value,
        this.Gender.nativeElement.value,
        this.Dob.nativeElement.value,
        this.Course.nativeElement.value,
        this.Marks.nativeElement.value,
        this.Fee.nativeElement.value
      );

      this.isInserting = false;
      this.students = this.studentService.filterStudentByGender(
        this.filterText
      );

      this.totalStudents = new Promise((resolve, rejection) => {
        resolve(this.students.length);
      });
    } else {
      this.Name.nativeElement.value
        ? (this.Name.nativeElement.style.border = 'none')
        : (this.Name.nativeElement.style.border = '2px solid red');
      this.Dob.nativeElement.value
        ? (this.Dob.nativeElement.style.border = 'none')
        : (this.Dob.nativeElement.style.border = '2px solid red');
      this.Marks.nativeElement.value
        ? (this.Marks.nativeElement.style.border = 'none')
        : (this.Marks.nativeElement.style.border = '2px solid red');
      this.Fee.nativeElement.value
        ? (this.Fee.nativeElement.style.border = 'none')
        : (this.Fee.nativeElement.style.border = '2px solid red');
    }
  }

  OnEditClicked(stdId: number) {
    this.isEditing = true;
    this.stdIdToEdit = stdId;
  }

  onDeleteClicked(studentId: number) {
    this.studentService.DeleteStudent(studentId);
    this.students = this.studentService.filterStudentByGender(this.filterText);
    this.totalStudents = new Promise((resolve, rejection) => {
      resolve(this.students.length);
    });
  }

  OnEditCancelled() {
    this.isEditing = false;
  }

  OnEditSaved(student: Student) {
    if (
      this.editName.nativeElement.value &&
      this.editDob.nativeElement.value &&
      this.editMarks.nativeElement.value &&
      this.editFee.nativeElement.value
    ) {
      student.name = this.editName.nativeElement.value;
      student.gender = this.editGender.nativeElement.value;
      student.dob = this.editDob.nativeElement.value;
      student.course = this.editCourse.nativeElement.value;
      student.marks = this.editMarks.nativeElement.value;
      student.fee = this.editFee.nativeElement.value;

      this.isEditing = false;
      this.students = this.studentService.filterStudentByGender(
        this.filterText
      );
    } else {
      this.editName.nativeElement.value
        ? (this.editName.nativeElement.style.border = 'none')
        : (this.editName.nativeElement.style.border = '2px solid red');
      this.editDob.nativeElement.value
        ? (this.editDob.nativeElement.style.border = 'none')
        : (this.editDob.nativeElement.style.border = '2px solid red');
      this.editMarks.nativeElement.value
        ? (this.editMarks.nativeElement.style.border = 'none')
        : (this.editMarks.nativeElement.style.border = '2px solid red');
      this.editFee.nativeElement.value
        ? (this.editFee.nativeElement.style.border = 'none')
        : (this.editFee.nativeElement.style.border = '2px solid red');
    }
  }
}
