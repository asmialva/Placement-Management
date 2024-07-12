from fastapi import APIRouter, HTTPException
from utils.db import db
from utils.models import  Contacts, LoginCredentials

router = APIRouter()


@router.post('/add_contact')
async def handle_contact(contact: Contacts):
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Contacts (Name, Email, Subject, Message) VALUES (%s, %s, %s, %s)",
                       (contact.firstName, contact.email, contact.subject, contact.message))
        db.commit()
        contact_id = cursor.lastrowid  
        return {"message": "Contact added successfully", "contact_id": contact_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"An error occurred while adding the contact: {str(e)}")

@router.delete('/delete_contact/{contact_id}')
async def delete_contact(contact_id: int):
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM Contacts WHERE ContactID = %s", (contact_id,))
        db.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        return {"message": "Contact deleted successfully", "contact_id": contact_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"An error occurred while deleting the contact: {str(e)}"
        )
    
@router.get("/contacts/")
async def get_contacts():
    try:
        cursor = db.cursor()
        cursor.execute("SELECT * FROM contacts")
        contacts = cursor.fetchall()
        contact_list = []
        for contact in contacts:
            contact_data = {
                "contact_id": contact[0],
                "firstName": contact[1],
                "email": contact[2],
                "subject": contact[3],
                "message": contact[4]
            }
            contact_list.append(contact_data)
        return contact_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving contacts: {str(e)}")
    
@router.post("/admin_login/")
async def login(credentials: LoginCredentials):
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM admins WHERE username = %s AND password = %s", (credentials.usn, credentials.password))
        admin = cursor.fetchone()
        if admin:
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during login: {str(e)}")