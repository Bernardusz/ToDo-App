# ToDo-App
> A simple todo App using **React** and **Django** in my series of learning Django and React !

## Stack used 

### React
> - React
> - React-Router-Dom
> - Zustand
> - Axios
> - Tailwind CSS

### Django
> - Django
> - Django-cors-headers
> - Djangorestframework
> - Djangorestframework_simplejwt

## Features
- User authentication (JWT)
- Add, delete, edit tasks
- Persistent storage using Django backend
- React frontend for a clean UI

## Project Structure
```
|-- backend/ #Django Project
|  |-- manage.py
|  |-- backend/
|  |-- Task/
|  |-- User/
|-- frontend/ #React Project
|  |-- src/
|  |-- package.json
|-- .gitignore
|-- README.md
```

## cd backend

### Backend (Django)
```
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
### Frontend (React)
```
cd frontend
npm install
npm run dev
```

## Usage
1. Register a new user
2. Login to recieve JWT Token
3. Manage Tasks (Add, Toggle, Delete)

## Remember ✨🌠
> I don't know, just remember to sleep and take shower aight 🐧💀

