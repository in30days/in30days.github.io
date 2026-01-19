---
title: "Mastering Dockerfiles"
date: 2024-01-06
module: 6
weight: 6
draft: false
duration: "75 min"
difficulty: "intermediate"
description: "Learn how to write efficient, production-ready Dockerfiles to containerize any application"
objectives:
  - Understand the Dockerfile build process and context
  - Master core instructions (FROM, RUN, COPY, WORKDIR)
  - Distinguish between CMD and ENTRYPOINT
  - Use ENV and ARG for configuration
  - Implement best practices for layer caching
prerequisites: [5]
tags: ["docker", "dockerfile", "images", "build"]
---

## What is a Dockerfile?

A **Dockerfile** is a text document that contains all the commands a user could call on the command line to assemble an image. Using `docker build`, users can create an automated build that executes several command-line instructions in succession.

### The Build Context
When you run `docker build .`, the `.` represents the **build context**. Docker sends everything in that directory to the Docker Daemon. 
**Rule**: Keep your Dockerfile in a clean directory and only include the files you need for the image.

---

## 1. Core Instructions Breakdown

### `FROM` (The Foundation)
Every valid Dockerfile must start with a `FROM` instruction. It sets the **Base Image** for subsequent instructions.
```dockerfile
FROM alpine:3.18
```

### `WORKDIR` (The Home)
Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` instructions that follow. If the directory doesn't exist, Docker creates it.
```dockerfile
WORKDIR /app
```

### `COPY` vs `ADD`
-   **`COPY`**: Simply copies files from your host to the image. (Recommended for 99% of cases).
-   **`ADD`**: Can extract tarballs automatically and fetch files from URLs. (Use with caution).
```dockerfile
COPY . .
```

### `RUN` (The Builder)
Executes commands in a new layer on top of the current image and commits the results. Used for installing packages.
```dockerfile
RUN apk add --no-cache python3 py3-pip
```

---

## 2. CMD vs. ENTRYPOINT

This is one of the most common points of confusion in Docker.

### `ENTRYPOINT` (The Executable)
Sets the command and parameters that will be executed when the container starts. It makes the container behave like a dedicated binary.
```dockerfile
ENTRYPOINT ["python3"]
```

### `CMD` (The Default Arguments)
Provides defaults for an executing container. If the user provides arguments during `docker run`, the `CMD` is ignored.
```dockerfile
CMD ["app.py"]
```

**Resulting command**: `python3 app.py`. 
If you run `docker run my-image script.py`, the command becomes `python3 script.py`.

---

## Hands-on Exercise 1: Building a Custom Web Server

1. Create a file named `index.html`:
   ```html
   <h1>Hello from Docker!</h1>
   ```
2. Create a `Dockerfile`:
   ```dockerfile
   FROM nginx:alpine
   COPY index.html /usr/share/nginx/html/index.html
   EXPOSE 80
   ```
3. Build the image:
   ```bash
   docker build -t my-custom-web .
   ```
4. Run it:
   ```bash
   docker run -d -p 8080:80 my-custom-web
   ```
5. Visit `http://localhost:8080` to see your custom page!

---

## 3. Best Practices: Layer Caching

Docker caches each instruction as a layer. If you change a file and rebuild, Docker only re-executes the layers from the change point onwards.

**Poor Practice**:
```dockerfile
COPY . .
RUN npm install  # This runs every time any file changes!
```

**Best Practice**:
```dockerfile
COPY package.json .
RUN npm install  # This only runs if package.json changes
COPY . .         # Now copy the rest of the code
```

---

## Summary

-   **Dockerfile** is the blueprint for your image.
-   **FROM** is required; **WORKDIR** is best for organization.
-   **COPY** is preferred over ADD.
-   **ENTRYPOINT** defines the tool; **CMD** defines the default arguments.
-   Order your instructions from **least frequent to most frequent changes** to maximize caching.

{{< progress-check id="module6-complete" >}}I can write and build custom Dockerfiles{{< /progress-check >}}

## Practice Questions

1.  Which instruction is used to set environment variables that persist in the container?
2.  What happens to the build cache if you change the `FROM` line?
3.  Why is it better to run `npm install` before copying the rest of your source code?

## Next Steps

Now that you can build images, let's learn how to make them smaller and faster. In the next module, we explore **Image Optimization**.

Take the quiz to finish Module 6!
