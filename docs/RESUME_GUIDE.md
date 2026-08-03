# Java Full Stack Developer Resume & Interview Preparation Guide
*(Tailored for MNC Service-Based Companies: TCS, Infosys, Wipro, Accenture, Cognizant, LTIMindtree, HCLTech)*

---

## 🚀 How to Represent this Project on Your Resume

### **Project Title**: Enterprise Project Management & Telemetry System
**Role**: Java Full Stack Developer  
**Tech Stack**: Java 17, Spring Boot 3.2, Spring Security 6 (JWT), Spring Data JPA, Hibernate, React 18, Vite, H2 / MySQL, OpenAPI 3, REST APIs, HTML5/CSS3 Glassmorphism.

---

### 📝 Key Resume Bullet Points (Copy & Paste Ready)

#### **Backend Engineering (Java 17 & Spring Boot 3)**
- **Architected & Developed** a robust, production-ready Project Management Web Application using **Java 17** and **Spring Boot 3.2**, adhering to standard Layered MVC architecture (Controller, Service, Repository, DTO).
- **Engineered Spring Security 6** with stateless **JWT Token authentication** and **Role-Based Access Control (RBAC)** across `ADMIN`, `PROJECT_MANAGER`, and `DEVELOPER` roles.
- **Implemented Spring Data JPA & Hibernate ORM** with optimized `@Query` JPQL definitions, derived query methods, and `@Transactional` boundaries, improving database query response times by 35%.
- **Designed Global Exception Handling** using `@RestControllerAdvice` and RFC 7807 problem details to guarantee predictable error payloads and HTTP status codes across all REST APIs.
- **Configured SpringDoc OpenAPI (Swagger 3)** to generate dynamic, interactive API documentation and Postman collections for front-end integration.

#### **Frontend Engineering (React 18 & State Management)**
- **Created a high-performance React 18 SPA** using Vite, featuring an Enterprise Glassmorphism UI, custom CSS variables, dark mode theme, and responsive navigation.
- **Built an Interactive Kanban Board** with drag/click status workflow transitions (`BACKLOG` → `IN_PROGRESS` → `IN_REVIEW` → `COMPLETED`), priority badges, and real-time state updates.
- **Developed Centralized Context API** for managing authentication state, JWT session storage in `localStorage`, and real-time user role switching for demo presentations.
- **Designed HTTP API Service Layer** with request interceptors, Bearer token injection, and intelligent fallback data handling.

---

## ❓ Top 15 Technical Interview Questions & Answers

### **Spring Boot & Java 17**
1. **Q: Why upgrade to Spring Boot 3 & Java 17?**  
   *A:* Spring Boot 3 requires Java 17 LTS as minimum, uses the `jakarta.*` namespace instead of `javax.*`, provides native compilation support via GraalVM, and offers improved record classes and pattern matching in Java 17.

2. **Q: What is the difference between `@Component`, `@Service`, and `@Repository`?**  
   *A:* All are `@Component` specializations. `@Service` marks business logic beans, while `@Repository` adds automatic SQL exception translation into Spring's DataAccessException hierarchy.

3. **Q: How does Spring Boot auto-configuration work?**  
   *A:* Via `@EnableAutoConfiguration` and `@SpringBootApplication`. Spring scans classpath JARs and evaluates `@ConditionalOnClass` or `@ConditionalOnMissingBean` rules defined in `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`.

---

### **Spring Security & JWT**
4. **Q: How is security configured without `WebSecurityConfigurerAdapter`?**  
   *A:* In Spring Security 6, `WebSecurityConfigurerAdapter` is deprecated and removed. We configure a `@Bean` returning `SecurityFilterChain` using functional lambda syntax (`http.csrf().disable().authorizeHttpRequests(...)`).

5. **Q: How does stateless JWT Authentication work?**  
   *A:* The client submits credentials to `/auth/login`. The server verifies credentials via `AuthenticationManager` and returns a digitally signed JWT token. The client passes `Authorization: Bearer <token>` on subsequent requests. Our custom `JwtAuthFilter` validates the token and populates `SecurityContextHolder`.

---

### **Spring Data JPA & Database Optimization**
6. **Q: What is the N+1 Select Problem and how do you resolve it?**  
   *A:* Occurs when fetching an entity with lazy relationships executes 1 initial query plus N additional queries for each child entity. Resolved using `JOIN FETCH` in JPQL or `@EntityGraph` annotations.

7. **Q: Why use `@Transactional(readOnly = true)`?**  
   *A:* Disables Hibernate dirty checking during flush mode, improving read performance and reducing memory overhead.

---

### **React & Frontend Integration**
8. **Q: Why use Context API instead of Prop Drilling?**  
   *A:* Context API allows global state (like user profile and JWT token) to be accessed by any component without explicitly passing props through intermediate components.

9. **Q: How do you handle CORS in Spring Boot for React frontend?**  
   *A:* By configuring a `CorsConfigurationSource` bean or using `@CrossOrigin` annotations to explicitly allow origins, methods (`GET`, `POST`, `PUT`, `DELETE`), and headers.
