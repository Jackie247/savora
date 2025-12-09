curl -X POST http://localhost:8080/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "email": "admin@gmail.com", "password": "admin123", "is_admin": true}'