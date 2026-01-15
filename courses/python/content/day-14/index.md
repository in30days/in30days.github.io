---
title: "Project: CLI Task Manager"
date: 2024-01-14
day: 14
weight: 14
draft: false
duration: "90 min"
difficulty: "beginner"
description: "Put your knowledge of functions, logic, and files into practice by building a real application"
objectives:
  - Organize code into functional blocks
  - Implement a persistent storage system using text files
  - Handle user input and application flow
  - Practice basic error handling
prerequisites: [13]
tags: ["project", "cli", "functions", "basics"]
---

## Week 2 Milestone

Congratulations on finishing Week 2! You've learned about functions, scope, errors, and files. Now it's time to bring it all together by building a **Command Line Task Manager**.

## Project Requirements

Your application should allow a user to:
1. **View** all tasks.
2. **Add** a new task.
3. **Delete** a task.
4. **Save** tasks to a file (`tasks.txt`) so they are still there when the program restarts.

## Step 1: Planning the Functions

Break the problem down into smaller tasks:
- `load_tasks()`: Read from the file and return a list.
- `save_tasks(tasks)`: Write the current list to the file.
- `show_menu()`: Print the user options.
- `main()`: The loop that runs the app.

## Step 2: Implementation Starter

{{< code-file filename="task_manager.py" lang="python" >}}
def load_tasks():
    try:
        with open("tasks.txt", "r") as f:
            return [line.strip() for line in f.readlines()]
    except FileNotFoundError:
        return []

def save_tasks(tasks):
    with open("tasks.txt", "w") as f:
        for task in tasks:
            f.write(task + "\n")

def main():
    tasks = load_tasks()
    
    while True:
        print("\n--- TASK MANAGER ---")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Delete Task")
        print("4. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == "1":
            for i, t in enumerate(tasks):
                print(f"{i+1}. {t}")
        elif choice == "2":
            new_task = input("Enter task: ")
            tasks.append(new_task)
            save_tasks(tasks)
        elif choice == "4":
            break
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    main()
{{< /code-file >}}

## Your Challenge

Enhance the project with these features:
- **Delete Functionality:** Ask for a task number and remove it from the list.
- **Error Handling:** Use `try...except` to handle cases where the user enters a non-number for deletion.
- **Clear UI:** Add some spacing or dividers to make the output look nice.

---

## Interactive Practice

How would you visualize the loop of this application?

{{< mermaid >}}
flowchart TD
    Start([Start]) --> Load[Load tasks.txt]
    Load --> Menu[Display Menu]
    Menu --> Input[Get User Choice]
    Input --> Action{Choice?}
    Action -- 1 --> View[Print List]
    Action -- 2 --> Add[Add to list & Save]
    Action -- 3 --> Del[Remove & Save]
    Action -- 4 --> Exit([End])
    View --> Menu
    Add --> Menu
    Del --> Menu
{{< /mermaid >}}

{{< quiz >}}
