package ca.gbc.comp3095.productservice;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.HttpStatus;
import org.testcontainers.containers.MongoDBContainer;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductServiceApplicationTests {

    @ServiceConnection
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:latest");

    @LocalServerPort
    private Integer port;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
    }

    static {
        mongoDBContainer.start();
    }

    @Test
    void createProductTest() {

        String requestBody = """
                {
                   "name": "Samsung TV",
                   "description": "Samsung TV - Model 2025",
                   "price": 2500
                }                
                """;


        //Given - When - Then - BDD
        RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/api/product")
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("id", Matchers.notNullValue())
                .body("name", Matchers.equalTo("Samsung TV"))
                .body("description", Matchers.equalTo("Samsung TV - Model 2025"))
                .body("price", Matchers.equalTo(2500));

    }


    @Test
    void getAllProductsTest() {

        String requestBody = """
                {
                   "name": "Samsung TV",
                   "description": "Samsung TV - Model 2025",
                   "price": 2500
                }                
                """;


        //Create/Post Test Product
        RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/api/product")
                .then()
                .log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("id", Matchers.notNullValue())
                .body("name", Matchers.equalTo("Samsung TV"))
                .body("description", Matchers.equalTo("Samsung TV - Model 2025"))
                .body("price", Matchers.equalTo(2500));


        //GET Product
        RestAssured.given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/product")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .body("size()", Matchers.greaterThan(0))
                .body("[0].name", Matchers.equalTo("Samsung TV"))
                .body("[0].description", Matchers.equalTo("Samsung TV - Model 2025"))
                .body("[0].price", Matchers.equalTo(2500));

    }


    private String createProductAndReturnId(String name, String description, int price) {

        String requestBody = """
                {
                   "name": "%s",
                   "description": "%s",
                   "price": %d
                }                
                """.formatted(name, description, price);

        return RestAssured.given()
                .contentType(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/api/product")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .extract()
                .path("id");
    }


    @Test
    void updateProductTest() {

        String id = createProductAndReturnId("LG Monitor", "LG 27-inch 4K", 800);

        String updateBody = """
                {
                   "name": "LG Monitor",
                   "description": "LG 27-inch 4K",
                   "price": 1000
                }                
                """;

        RestAssured.given()
                .contentType(ContentType.JSON)
                .body(updateBody)
                .when()
                .put("/api/product/{id}", id)
                .then()
                .statusCode(HttpStatus.NO_CONTENT.value())
                .header("Location", "/api/product/" + id);


        RestAssured.given()
                .when()
                .get("/api/product")
                .then()
                .log().all()
                .statusCode(HttpStatus.OK.value())
                .body("find { it.id == '%s'}.name".formatted(id), Matchers.equalTo("LG Monitor"))
                .body("find { it.id == '%s'}.description".formatted(id), Matchers.equalTo("LG 27-inch 4K"))
                .body("find { it.id == '%s'}.price".formatted(id), Matchers.equalTo(1000));

    }

    @Test
    void deleteProductTest(){

        //Create Test Product
        String id = createProductAndReturnId("Temp Item", "Disposable", 10);

        //Get Verify Product
        RestAssured.given()
                .when()
                .get("/api/product")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("id", Matchers.hasItem(id));


        //Delete Test Product
        RestAssured.given()
                .when()
                .delete("/api/product/{id}", id)
                .then()
                .log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());

        RestAssured.given()
                .when()
                .get("/api/product")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("id", Matchers.not(Matchers.hasItem(id)));


    }


}
