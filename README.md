# COMP3095-2025 - Product Service Microservice

A Spring Boot microservice application for managing product data with MongoDB integration.

## 📋 Project Description

This project is a RESTful microservice built with Spring Boot that provides CRUD operations for product management. It demonstrates modern microservice architecture patterns and best practices.

## ⚙️ Technologies Used

- **Java 20 / OpenJDK**  
- **Spring Boot 3.x**  
- **Gradle 9.1**  
- **MongoDB (local instance)**  
- **Postman** (for API testing)  
- **IntelliJ IDEA (Community Edition)**

## 🚀 Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:

- **Java 20 or higher** - [Download OpenJDK](https://openjdk.org/)
- **MongoDB** - [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **Gradle 9.1+** (included via Gradle Wrapper)
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:VirtualVince/Semester-5.git
   cd Semester-5
   git checkout COMP3095-ICE1
   ```

2. **Start MongoDB**
   
   Make sure MongoDB is running on your local machine:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Configure Application Properties**
   
   Check `src/main/resources/application.properties` and update MongoDB connection if needed:
   ```properties
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=productdb
   ```

4. **Build the Project**
   ```bash
   # Using Gradle Wrapper (recommended)
   ./gradlew clean build
   
   # Windows
   gradlew.bat clean build
   ```

5. **Run the Application**
   ```bash
   ./gradlew bootRun
   
   # Or run from IntelliJ IDEA:
   # Right-click on ProductServiceApplication.java > Run
   ```

The application should start on `http://localhost:8080`

## 📡 API Endpoints

### Product Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/product` | Get all products |
| GET | `/api/product/{id}` | Get product by ID |
| POST | `/api/product` | Create a new product |
| PUT | `/api/product/{id}` | Update existing product |
| DELETE | `/api/product/{id}` | Delete product |

### Sample Request Body (POST/PUT)

```json
{
  "name": "LG Monitor",
  "description": "LG 27-inch 4K",
  "price": 1800
}
```

## 🧪 Testing with Postman

1. **Import Collection** (if available) or create requests manually
2. **Test GET Request**:
   - URL: `http://localhost:8080/api/product`
   - Method: GET
   
3. **Test POST Request**:
   - URL: `http://localhost:8080/api/product`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body: Use the sample JSON above

## 🏗️ Project Structure

```
product-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── ca.gbc.comp3095.productservice/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       └── ProductServiceApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── build.gradle.kts
└── README.md
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh` or `mongo` in terminal
- Check MongoDB logs for errors
- Verify connection string in `application.properties`

### Port Already in Use
- Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```

### Build Failures
- Ensure Java 20+ is installed: `java -version`
- Clean and rebuild: `./gradlew clean build --refresh-dependencies`

## 👤 Author

**VirtualVince**
- GitHub: [@VirtualVince](https://github.com/VirtualVince)

## 📝 License

This project is created for educational purposes as part of COMP3095-2025 coursework.

## 🎓 Course Information

- **Course**: COMP3095 - Web Application Development
- **Institution**: George Brown College
- **Semester**: Winter 2025