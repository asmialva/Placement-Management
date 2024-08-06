from typing import Optional
from pydantic import BaseModel

class Contacts(BaseModel):
    firstName:str
    email:str
    subject:str
    message:str

class Company(BaseModel):
    companyName: str
    websiteUrl: str
    minGpa: Optional[float]
    maxGpa: Optional[float]
    package: Optional[float]
    domain: Optional[str]
    interviewDate: Optional[str]
    email: str
    description: Optional[str]

class Student(BaseModel):
    usn: str
    name: str
    mail: str
    password: str
    gpa: float
    phone: str
    current_sem: int

class LoginCredentials(BaseModel):
    usn: str
    password: str

def serialize_companies(datas):
    data=[]
    for i in datas:
        data.append({"Name":i[0],"Mail":i[1],"package":i[2],"Domain":i[3],"interview_date":i[4],"CompanyID":i[5]})
    return data