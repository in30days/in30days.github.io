---
title: "Working with Registries"
date: 2024-01-05
module: 5
weight: 5
draft: false
duration: "50 min"
difficulty: "intermediate"
description: "Master the art of finding, pulling, and managing images using Docker Hub and tags"
objectives:
  - Search for images using the CLI and Docker Hub website
  - Understand the naming convention of Docker images
  - Use tags to manage different versions of software
  - Learn how image layers work conceptually
  - Pull and remove images from local storage
prerequisites: [4]
tags: ["docker", "registries", "hub", "images", "tags"]
---

## What is a Registry?

A **Registry** is a hosted service that stores and distributes Docker images. The most famous one is **Docker Hub**, which is the default registry for the Docker CLI. 

However, you can also use:
- **Cloud Registries**: Amazon ECR, Google GCR/GAR, Azure ACR.
- **Self-hosted**: Harbor or the official Docker Registry image.

---

## 1. Naming Conventions

To work with images, you must understand how they are named. A full image name looks like this:

`registry.com/username/repository:tag`

-   **Registry**: The server address (defaults to `docker.io` if omitted).
-   **Username**: The account/namespace (defaults to `library` for official images).
-   **Repository**: The name of the software (e.g., `nginx`, `python`, `redis`).
-   **Tag**: The version or variant (defaults to `latest` if omitted).

**Example**: `docker.io/library/ubuntu:22.04`

---

## 2. Finding Images

### Using the CLI
You can search directly from your terminal:
```bash
docker search python
```
Look for the **OFFICIAL** column. Official images are maintained by the Docker team and the original software authors. They are highly recommended for security and stability.

### Using Docker Hub Website
Visit [hub.docker.com](https://hub.docker.com). It provides more information, such as:
-   **Supported Architectures** (x86 vs ARM/M1).
-   **Documentation** (How to use the image).
-   **Image Layers** (What's inside).

---

## 3. Mastering Tags

Tags are crucial. They allow you to pin your application to a specific version of a dependency.

### The Problem with `latest`
The `latest` tag is not a magic version; it's just a default label. If you use `latest`, your application might break tomorrow if the maintainer updates the image and changes a library your app depends on.

### Semantic Versioning (SemVer)
Most images follow `Major.Minor.Patch` (e.g., `3.9.5`).

### Variant Tags
Many images come in different flavors:
-   **Alpine**: Extremely small (5MB), based on Alpine Linux. Great for production.
-   **Slim**: Smaller than the standard image but not as minimal as Alpine.
-   **Windowsservercore**: Specifically for Windows containers.

---

## Hands-on Exercise 1: Pulling Specific Versions

Let's see how much space tags can save you.

1.  **Pull the standard Python image**:
    ```bash
    docker pull python:3.9
    ```
2.  **Pull the Alpine version**:
    ```bash
    docker pull python:3.9-alpine
    ```
3.  **Compare sizes**:
    ```bash
    docker images | grep python
    ```
    *Observation: Notice how the Alpine version is significantly smaller (usually <50MB vs >300MB).*

---

## 4. Understanding Layers (Conceptual)

Docker images are made of **Layers**. Every instruction in a Dockerfile creates a new layer. 

When you pull an image, Docker downloads these layers. If two images share the same base (e.g., both are based on `ubuntu:22.04`), Docker only downloads that base layer **once**.

```bash
# Pull another image that shares layers
docker pull python:3.9-slim
```
*Look at the output. You will see some lines say "Already exists". This is Docker being efficient!*

---

## 5. Cleaning Up Images

Images take up real disk space on your host machine.

```bash
# Remove a specific image
docker rmi python:3.9

# Remove all unused images (those not used by any container)
docker image prune
```

---

## Summary

-   **Docker Hub** is the default registry.
-   **Official Images** are safer and better maintained.
-   **Always use specific tags** in production; avoid `latest`.
-   **Alpine** variants are great for keeping production images small.
-   **Layers** are shared between images, saving bandwidth and disk space.

{{< progress-check id="module5-complete" >}}I understand how to manage and use images from registries{{< /progress-check >}}

## Practice Questions

1.  What happens if you run `docker run my-app` and you don't specify a tag?
2.  Why is an Alpine-based image usually preferred for production?
3.  How do you identify an "Official" image on Docker Hub?

## Next Steps

Now that we know how to use other people's images, it's time to build our own! In the next module, we'll dive deep into **Mastering Dockerfiles**.

Take the quiz to finish Module 5!
