---
title: "The Container Lifecycle"
date: 2024-01-04
module: 4
weight: 4
draft: false
duration: "60 min"
difficulty: "intermediate"
description: "Master the fundamental commands to create, manage, and destroy Docker containers"
objectives:
  - Understand the difference between 'run', 'start', and 'create'
  - Use interactive and detached modes effectively
  - Execute commands inside running containers
  - Monitor container logs and resource usage
  - Clean up containers and understand the 'stop' vs 'kill' signals
prerequisites: [3]
tags: ["docker", "lifecycle", "cli", "containers"]
---

## Understanding the Lifecycle

A Docker container is a process. Like any process, it has a beginning, a middle, and an end. However, because containers are built from immutable images, their lifecycle is highly predictable and manageable.

### The Main States
1.  **Created**: The container is defined but not yet started.
2.  **Running**: The process is active and isolated.
3.  **Paused**: The process state is suspended in memory.
4.  **Exited**: The process has finished or was stopped.
5.  **Deleted**: The container and its writeable layer are gone.

---

## 1. Creating and Running Containers

The most common command you'll use is `docker run`. It's actually a combination of `docker create` and `docker start`.

### Detached vs. Interactive Mode

#### Detached Mode (`-d`)
Used for long-running services (like web servers or databases). The container runs in the background.
```bash
docker run -d --name my-web nginx
```

#### Interactive Mode (`-it`)
Used when you want to "enter" the container.
- `-i`: Keep STDIN open.
- `-t`: Allocate a pseudo-TTY (terminal).
```bash
docker run -it ubuntu /bin/bash
```

---

## Hands-on Exercise 1: Exploring States

Let's watch a container move through its lifecycle.

1.  **Create and Start**:
    ```bash
    docker run -d --name lifecycle-test alpine sleep 1000
    ```
2.  **Check Status**:
    ```bash
    docker ps
    ```
3.  **Stop the Container**:
    ```bash
    docker stop lifecycle-test
    ```
    *Note: Docker sends a SIGTERM signal, giving the process 10 seconds to shut down gracefully.*
4.  **Verify it's gone from active list**:
    ```bash
    docker ps
    ```
5.  **Find it in the "all" list**:
    ```bash
    docker ps -a
    ```
6.  **Restart it**:
    ```bash
    docker start lifecycle-test
    ```

---

## 2. Executing Commands in Running Containers

Sometimes you need to inspect a running container or change a configuration file. The `exec` command is your best friend.

```bash
# Run a command and get output without staying inside
docker exec lifecycle-test hostname

# Start an interactive shell inside an already running container
docker exec -it lifecycle-test sh
```

{{< callout type="info" title="Exec vs Run" >}}
- `docker run` creates a **NEW** container.
- `docker exec` runs a command in an **EXISTING** container.
{{< /callout >}}

---

## 3. Logs and Monitoring

Since detached containers run in the background, you need a way to see what's happening.

### Viewing Logs
```bash
# See all history
docker logs lifecycle-test

# Follow logs in real-time (like tail -f)
docker logs -f lifecycle-test
```

### Resource Usage
```bash
# Real-time CPU, Memory, and Network stats
docker stats lifecycle-test
```

---

## 4. Cleanup

Containers occupy disk space because they have a "Writeable Layer" (where any changes made while running are stored).

### Removal Commands
```bash
# Remove a stopped container
docker rm lifecycle-test

# Force remove a running container (Sends SIGKILL)
docker rm -f lifecycle-test

# Remove all stopped containers at once
docker container prune
```

---

## Hands-on Exercise 2: The --rm Flag

In development, you often run containers just to test something. The `--rm` flag automatically deletes the container as soon as it exits.

1. Run this:
   ```bash
   docker run --rm alpine echo "I will disappear"
   ```
2. Check `docker ps -a`. You'll notice the container is not there. This is a best practice for keeping your system clean!

---

## Summary

- `docker run` = create + start.
- Use `-d` for background services and `-it` for interactive shells.
- `docker exec` lets you interact with a container that is already running.
- `docker stop` is graceful; `docker rm -f` (or `docker kill`) is immediate.
- Always try to use `--rm` for one-off tasks.

{{< progress-check id="module4-complete" >}}I master the container lifecycle and core CLI commands{{< /progress-check >}}

## Practice Questions

1. What is the difference between `docker stop` and `docker kill`?
2. How do you see the logs of a container that crashed?
3. Which flag allows you to name your container instead of getting a random one like "flamboyant_hopper"?

## Next Steps

In the next module, we'll learn about **Working with Registries**—how to find, pull, and push images to Docker Hub.

Take the quiz to finish Module 4!
