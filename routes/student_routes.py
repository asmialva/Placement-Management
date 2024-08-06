
from fastapi import APIRouter, HTTPException, Path
from utils.db import db
from utils.models import  Company, LoginCredentials, Student, serialize_companies
from typing import List


router = APIRouter()




@router.post("/save_student/")
async def save_student(student: Student):
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO student (usn, name, mail, password, gpa, phone, current_sem) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (student.usn, student.name, student.mail, student.password, student.gpa, student.phone, student.current_sem))
        db.commit()
        return {"message": "Student saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while saving the student: {str(e)}")
    
@router.post("/student_login/")
async def login(credentials: LoginCredentials):
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM student WHERE usn = %s AND password = %s", (credentials.usn, credentials.password))
        student = cursor.fetchone()
        if student:
            return {"message": True, "student": {"usn": student[0], "name": student[1], "mail": student[2], "gpa": student[4], "phone": student[5], "current_sem": student[6]}}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during login: {str(e)}")
    
    
@router.delete("/delete_student/{usn}")
async def delete_student(usn: str):
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM student WHERE usn = %s", (usn,))
        student = cursor.fetchone()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        cursor.execute("DELETE FROM student WHERE usn = %s", (usn,))
        db.commit()
        
        return {"message": f"Student with USN {usn} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while deleting the student: {str(e)}")
    

@router.get("/students/")
async def get_students():
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM student")
        students = cursor.fetchall()
        student_list = []
        for student in students:
            student_data = {
                "usn": student[0],
                "name": student[1],
                "mail": student[2],
                "password": student[3],
                "gpa": student[4],
                "phone": student[5],
                "current_sem": student[6]
            }
            student_list.append(Student(**student_data))
        return student_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving students: {str(e)}")
    

@router.get("/students/{student_id}")
async def get_student(student_id: str = Path(..., title="The ID of the student to retrieve")):
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM student WHERE usn = %s", (student_id,))
        student = cursor.fetchone()
        if student:
            student_data = {
                "usn": student[0],
                "name": student[1],
                "mail": student[2],
                "password": student[3],
                "gpa": student[4],
                "phone": student[5],
                "current_sem": student[6]
            }
            return Student(**student_data)
        else:
            raise HTTPException(status_code=404, detail="Student not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving the student: {str(e)}")
    

@router.get("/student_companies/{usn}")
async def get_student_companies(usn: str = Path(..., title="The USN of the student")):
    cursor = db.cursor()
    try:
        # Retrieve company details for the specified student based on their USN
        cursor.execute("""
            SELECT 
                c.Name,
                c.Mail,
                c.Package,
                c.Domain,
                c.interview_date
            FROM 
                company c
            JOIN 
                student_company sc ON c.CompanyID = sc.company
            WHERE 
                c.accepted = true
                AND sc.accepted = true
                AND sc.usn = %s
        """, (usn,))
        companies = cursor.fetchall()

        

        result = []
        for company in companies:
            company_data = {
                "Name": company[0],
                "Mail": company[1],
                "Package": company[2],
                "Domain": company[3],
                "interview_date": company[4]
            }
            result.append(company_data)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving companies: {str(e)}")
    
@router.get("/companies_not_associated/{usn}")
async def get_companies(usn: str):
    cursor = db.cursor()
    try:
        # Get the GPA of the student
        cursor.execute("SELECT gpa FROM student WHERE usn = %s", (usn,))
        student_gpa = cursor.fetchone()[0]
        print(usn, student_gpa)

        # Retrieve companies not associated with the student and having GPA requirement as expected
        cursor.execute("""
            SELECT 
                c.Name,
                c.Mail,
                c.Package,
                c.Domain,
                c.interview_date,
                c.CompanyID
            FROM 
                company c
            WHERE 
                c.CompanyID NOT IN (
                    SELECT 
                        company 
                    FROM 
                        student_company 
                    WHERE 
                        usn = %s
                )
                AND c.gpa_range_min <= %s
                AND c.gpa_range_max >= %s and accepted=1
        """, (usn, student_gpa, student_gpa))
        companies = cursor.fetchall()
        print(serialize_companies(companies))
        return serialize_companies(companies)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving companies: {str(e)}")
    
@router.post("/accept_company/{usn}/{company_id}")
async def accept_company(usn: str, company_id: int):
    try:
        cursor=db.cursor()
        cursor.execute("""
            INSERT INTO student_company (usn, company, accepted)
            VALUES (%s, %s, true)
        """, (usn, company_id))
        db.commit()

        return {"message": "Company accepted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while accepting the company: {str(e)}")

@router.post("/reject_company/{usn}/{company_id}")
async def reject_company(usn: str, company_id: int):
    try:
        cursor=db.cursor()
        cursor.execute("""
            INSERT INTO student_company (usn, company, accepted)
            VALUES (%s, %s, false)
        """, (usn, company_id))
        db.commit()

        return {"message": "Company rejected successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while rejecting the company: {str(e)}")