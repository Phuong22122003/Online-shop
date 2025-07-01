# E-Commerce Website

> A web project developed for educational purposes.

---

##  Description

###  User Roles:
- **Customer**: A user who browses and purchases products.
- **Seller**: A user who manages and sells products on the platform.

###  Core Features:

####  For Customers:
- **View Product Details**: See product name, price, and description.
- **Shopping Cart**:
  - View and manage cart items.
  - Select products to purchase.
  - View the total price.
  - Click to confirm and complete the purchase.
- **Order Status Tracking**:
  - View the status of orders (e.g., delivered, in transit, cancelled).

#### For Sellers:
- **Product Management**:
  - Add new products.
  - Edit product details (name, description, price).
  - Update inventory (increase/decrease quantity).

---

##  Technologies Used

###  Database:
- **SQL Server**

###  Backend:
- **Framework**: Spring Boot  
- **Security**: Spring Security

###  Frontend:
- **Languages**: HTML, CSS, JavaScript  
- **Template Engine**: Thymeleaf

---

## How to Run the Project

1. Clone the project repository.
2. Run the `sqlscript` file in SQL Server to set up the database schema.
3. Start the project using your preferred IDE or build tool (e.g., Maven or Gradle).

### Image Storage:
- Product images are saved in the `File` folder within the project.
- You can change the image storage path and update it in `application.properties`.

---

## Google OAuth2 Configuration (Optional)

To enable Google login, configure the following in your `application.properties` file:

```properties
spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
spring.security.oauth2.client.registration.google.scope=email,profile
