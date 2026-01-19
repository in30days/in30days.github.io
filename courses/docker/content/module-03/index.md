---
title: "Architecture & Installation"
date: 2024-01-03
module: 3
weight: 3
draft: false
duration: "60 min"
difficulty: "intermediate"
description: "Understand the client-server architecture and set up your Docker environment"
objectives:
  - Deep dive into the Docker Client-Server architecture
  - Understand the role of the Docker Desktop (Windows/macOS)
  - Install Docker on your local machine
  - Configure post-installation settings for Linux
prerequisites: [2]
tags: ["docker", "architecture", "installation", "setup"]
---

## The Docker Architecture

Docker uses a client-server architecture. Here's a deeper look at the three main pillars we introduced in Module 2:

### 1. The Client (CLI)
When you type `docker run`, the client sends this command to the daemon. The client can talk to a local daemon or even a remote daemon on a different server.

### 2. The Host (The Engine)
This is where the Docker Daemon (`dockerd`) lives. It handles:
- **Images**: Local storage of downloaded blueprints.
- **Containers**: Isolated process environments.
- **Networks**: Virtual switches and routers.
- **Volumes**: Persistent storage for container data.

### 3. The Registry
Registries are like app stores for images.
- **Docker Hub**: The default public registry.
- **Private Registries**: Companies often host their own (e.g., ECR, GCR, or Artifactory).

---

## Installation Guide

### Windows & macOS
For Windows and macOS, the recommended way is **Docker Desktop**. 
It includes the Docker Engine, CLI, and a graphical interface. It also manages a lightweight Linux VM behind the scenes because Docker requires a Linux kernel to run.

- **[Download for Windows](https://www.docker.com/products/docker-desktop/)** (Requires WSL2 or Hyper-V)
- **[Download for macOS](https://www.docker.com/products/docker-desktop/)** (Supports Intel and Apple Silicon)

### Linux (Ubuntu Example)
Linux is Docker's "native" home. Here is how to install the official Docker Engine on Ubuntu:

```bash
# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## Hands-on Exercise 1: Post-Installation (Linux Only)

By default, Docker requires `sudo`. To avoid typing it every time, add your user to the `docker` group:

```bash
# Create group (usually already exists)
sudo groupadd docker

# Add user to group
sudo usermod -aG docker $USER

# Log out and back in for changes to take effect!
```

## Hands-on Exercise 2: The info and version commands

Once installed, use these commands to verify your setup:

```bash
# Check client and server versions
docker version

# Check detailed system-wide information
docker info
```

Look for **"Server"** in the output of `docker version`. If you see an error saying "Cannot connect to the Docker daemon," it means the server process isn't running.

---

## Summary

- Docker follows a **Client-Server** architecture.
- The **Host** manages images, containers, networks, and volumes.
- **Docker Desktop** is a suite for non-Linux OS that runs a hidden Linux VM.
- Always use the **official repositories** when installing on Linux.

{{< progress-check id="module3-complete" >}}I have installed Docker and verified the architecture{{< /progress-check >}}

## Practice Questions

1. In the architecture, what is the component that downloads images from a Registry?
2. Why do Windows and macOS require a lightweight VM to run Docker?
3. What command shows how many containers (running or stopped) are on your host?

## Next Steps

In the next module, we'll start the **Core Docker Mechanics** section by mastering the container lifecycle.

Take the quiz to finish Module 3!
