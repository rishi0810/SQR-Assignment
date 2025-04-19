# IntelliSQR Form Assignment

<div align = "center">
<img src = "https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt = "Prisma">
<img src = "https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt = "Node Js">
<img src = "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt = "MongoDB">
<img src = "https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt = "ExpressJs">
<img src = "https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt = "Json Web Token">
<img src = "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt = "TypeScript">
<img src = "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt = "React">
<img src = "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt = "TailwindCSS">
<img src = "https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7" alt = "Zod">
<img src = "https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt = "Vite">
<img src = "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" alt = "Postman">
</div>


## ⚙️ Backend

The Backend for this form using prisma for database ORM and MongoDB Atlas as a cloud DB. Express Js is used to create routes, middlewares and controllers. Argon2 is used for password hashing when stored in the DB. JSON Web Token is used to pass a current logged in user as an HTTP Only session cookie which can have relevant information and access specifiers for a perticular user.


## Installation

1. **Clone repository**

```bash
git clone 
cd ./InternTest-Backend
npm install 
```
2. **Configure .env file**

```env
DATABASE_URL= your_mongodb_atlas_cluster
JWT_SECRET = your_jwt_secret
```

3.  **Run the project**
```bash
   npm run dev
```

## Routes
- **`POST /user/signup`**

  - **Description:** Registers a new user.
  - **Request Body:** `application/json`
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Response:**

  ```json
  {
    "message": "User has been created",
    "user": {
      "email": "useremail",
      "password": "password"
    }
  }
  ```

- **`POST /user/login`**
  - **Description:** Authenticates an existing user. Sets an HTTP-only cookie containing the JWT upon successful login.
  - **Request Body:** `application/json`
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - **Success Response (200 OK):** `application/json`

    ```json
    {
      "message": "Login Successful",
      "email": "user@email",
      "createdAt": "date",
      "id": "mongoDbid"
    }
    ```

  - **Headers:** Sets `Set-Cookie` header with the JWT (e.g., `token=...; HttpOnly; Path=/; Max-Age=...`).
    <br>
- **`GET /user/logout`**
  - **Description:** Logs the user out by clearing the HTTP-only authentication cookie.
  - **Response:** Success message. Clears the `token` cookie via `Set-Cookie` header.


## Frontend Validation (Zod + React Hook Form)

The frontend login form (`./InternTest-Frontend/src`) uses Zod for schema definition and React Hook Form for implementation.

- **Schema (`frontend/src/schemas/authSchema.ts`):** Defines the shape and rules for login data.
  ```typescript
  import { z } from 'zod';
  const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  });

  export type LoginFormData = z.infer<typeof loginSchema>;
  ```
## Installation

1. **Clone repository**

```bash
git clone 
cd ./InternTest-Frontend
npm install 
```
2.  **Run the project**
```bash
   npm run dev
```
- **Form Component:** Uses `useForm` with `zodResolver` to validate input against the schema.

## 🌐 Frontend API Integration (Axios)

API calls from the frontend to the backend are handled using Axios, typically within service functions (`frontend/src/services/authApi.ts`).

- **API Service (`/src/Login.tsx`):**
 
 #####  Successful Response

  ```typescript
  import axios from "axios";

  const onSubmit: SubmitHandler<User> = async (data: User) => { 
  const response = await axios.post<LoginSuccessResponse>(
        "http://localhost:3000/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", response.data);
 }

  ```

  ##### Failed Response

  ```typescript
    if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;

        if (serverError.response) {
          const status = serverError.response.status;
          switch (status) {
            case 401:
              setError("email", { type: "manual", message: " " });
              setError("password", {
                type: "manual",
                message: "Invalid password.",
              });
              break;

            case 404:
              setError("email", {
                type: "manual",
                message: "No account found with this email.",
              });
              break;

            case 500:
              toast.error("Internal Server Error");
              break;

            default:
              toast.error("Internal Server Error");
              break;
          }
        } else if (serverError.request) {
          console.error("Network Error:", serverError.request);
          toast.error("Network Error");
        } else {
          console.error("Axios Setup Error:", serverError.message);
          toast.error("Axios Setup Error");
        }
      } else {
        console.error("Unexpected Error:", error);
        toast.error("Unexpected Error Occured");
      }
   
  ```

- **Usage in Component:** The form's `onSubmit` handler calls these service functions. Error handling (e.g., displaying messages from the backend) should be implemented here. Remember to set `withCredentials: true` in your Axios instance or request config to handle the HTTP-only cookies correctly.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📧 Contact

Rishi Raj - [LinkedIn](https://www.linkedin.com/in/rishiraj2003/)

