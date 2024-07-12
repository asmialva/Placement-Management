from fastapi import APIRouter, HTTPException
from utils.db import db
from utils.models import Company

router = APIRouter()



@router.get("/companies/")
async def get_companies():
    cursor = db.cursor()

    try:
        cursor.execute("SELECT * FROM Company")
        companies = cursor.fetchall()
        company_list = []
        for company in companies:
            company_data = {
                "company_id": company[0],
                "name": company[1],
                "mail": company[2],
                "website": company[3],
                "package": company[4],
                "description": company[5],
                "gpa_range_min": company[6],
                "gpa_range_max": company[7],
                "domain": company[8],
                "interview_date": str(company[9])  ,
                "accepted": company[10]
            }
            company_list.append(company_data)

        return company_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving companies: {str(e)}")
       


@router.post("/add_company")
async def add_company(company: Company):
    cursor = db.cursor()
    try:
        cursor.execute("""
    INSERT INTO Company (
        Name, 
        Mail, 
        Website, 
        Package, 
        Description, 
        GPA_Range_Min, 
        GPA_Range_Max, 
        Domain, 
        Interview_Date
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
""", (
    company.companyName, 
    company.email, 
    company.websiteUrl, 
    company.package, 
    company.description, 
    company.minGpa, 
    company.maxGpa, 
    company.domain, 
    company.interviewDate
))

        db.commit()
        company_id = cursor.lastrowid
        return {"message": "Company added successfully", "company_id": company_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while adding the company: {str(e)}")


@router.delete("/delete_company/{company_id}")
async def delete_company(company_id: int):
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM Company WHERE CompanyID = %s", (company_id,))
        company = cursor.fetchone() 
        print(not company)
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")
        cursor.execute("DELETE FROM Company WHERE CompanyID = %s", (company_id,))
        db.commit()
        return {"message": f"Company with ID {company_id} deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while deleting the company: {str(e)}")
  

@router.patch("/update_company/{company_id}")
async def update_company_accepted_status(company_id: int):
    cursor = db.cursor()
    try:
        # Update the accepted status to false for the specified company
        cursor.execute("""
            UPDATE Company
            SET accepted = 1
            WHERE CompanyID = %s
        """, (company_id,))

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Company not found")

        db.commit()
        return {"message": "Company's accepted status updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred while updating the company: {str(e)}")