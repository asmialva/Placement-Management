from fastapi import FastAPI
from routes.admin_routes import router as admin_router
from routes.company_routes import router as company_router
from routes.student_routes import router as student_router
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()


origins = [
    "http://localhost",
    "http://localhost:5173", 
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE","PATCH"],
    allow_headers=["Authorization", "Content-Type"],
)



app.include_router(admin_router)
app.include_router(company_router)
app.include_router(student_router)