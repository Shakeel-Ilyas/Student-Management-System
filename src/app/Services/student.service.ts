import { Injectable } from '@angular/core';
import { Student } from '../Models/Student';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[] = [
    new Student(1, 'John Smith', 'Male', '1997-11-12', 'MBA', 520, 1899),
    new Student(2, 'Mark Vought', 'Male', '1998-10-06', 'B.Tech', 420, 2899),
    new Student(3, 'Sarah King', 'Female', '1996-09-22', 'B.Tech', 540, 2899),
    new Student(4, 'Merry Jane', 'Female', '1995-06-12', 'MBA', 380, 1899),
    new Student(5, 'Steve Smith', 'Male', '1999-12-21', 'M.Sc', 430, 799),
    new Student(6, 'Jonas Weber', 'Male', '1997-06-18', 'M.Sc', 320, 799),
    new Student(7, 'Emilia', 'Female', '1990-11-13', 'MBA', 420, 1799),
    new Student(8, 'Paul', 'Male', '1993-12-28', 'B.Tech', 523, 1599),
    new Student(9, 'Lizi', 'Female', '1996-04-21', 'B.Tech', 423, 1957),
    new Student(10, 'Carlas', 'Male', '1994-06-13', 'MBA', 473, 1645),
  ];

  totalMarks: number = 600;

  CreateStudent(name, gender, dob, course, marks, fee) {
    let id = this.students.length + 1;
    let student = new Student(id, name, gender, dob, course, marks, fee);
    this.students.push(student);
  }

  DeleteStudent(studentId: number) {
    this.students.filter((student, index) => {
      if (student.id === studentId) {
        this.students.splice(index, 1);
      }
    });

    this.students.filter((student) => {
      if (student.id > studentId) {
        student.id = student.id - 1;
      }
    });
  }

  filterStudentByGender(filterBy: string) {
    if (
      filterBy.toLowerCase() === 'all' ||
      filterBy === '' ||
      this.students.length === 0
    ) {
      return this.students;
    } else {
      return this.students.filter((std) => {
        return std.gender.toLowerCase() === filterBy.toLowerCase();
      });
    }
  }
}
