---
title: "Capstone: CLI Adventure Quest"
date: 2024-01-30
module: 30
weight: 30
draft: false
duration: "180 min"
difficulty: "beginner"
description: "Bring everything you've learned together in a final, fun project. Build a text-based adventure game."
objectives:
  - Apply the full Python fundamental skillset
  - Design a multi-file or multi-class system
  - Implement complex logic and data persistence
  - Celebrate your completion of the course!
prerequisites: [29]
tags: ["capstone", "project", "cli", "basics"]
---

## The Ultimate Challenge

Congratulations! You have spent 30 days mastering the foundations of Python. Today, we don't learn a new concept—we build something that proves you are a Python developer.

## Capstone Project: Quest for the Python

You will build a **Text-Based Adventure Game**. The game involves moving through rooms, collecting items, and overcoming challenges.

### Core Requirements:
1. **The Map:** At least 3 unique rooms (e.g., Forest, Cave, Castle).
2. **The Player:** A class that tracks health, inventory, and current location.
3. **The Commands:** A CLI that accepts "go [direction]", "get [item]", and "status".
4. **Saving:** Option to save your game state to a `savegame.json` file.
5. **Logic:** Use conditional statements to handle special events (e.g., "You cannot enter the Cave without a Torch").

## Implementation Strategy

{{< code-file filename="game_blueprint.py" lang="python" >}}
class Game:
    def __init__(self):
        self.rooms = {
            "Forest": {"desc": "A dark forest.", "north": "Cave"},
            "Cave": {"desc": "A damp cave.", "south": "Forest"}
        }
        self.current_room = "Forest"
        self.inventory = []

    def play(self):
        print("Welcome to Quest for the Python!")
        while True:
            print(f"\nYou are in the {self.current_room}")
            print(self.rooms[self.current_room]["desc"])
            
            action = input("> ").lower().split()
            if not action: continue
            
            if action[0] == "quit": break
            # Implement your movement and item logic here!

if __name__ == "__main__":
    Quest = Game()
    Quest.play()
{{< /code-file >}}

## What's Next?

Completing this course is just the beginning. You now have the skills to start building real-world scripts, automation tools, and data analysis projects.

**Your Learning Path continues with:**
- [Python Advanced in 30 Days](/python-advanced/) (Deep dive into performance and systems)
- [Python Web Development in 30 Days](/python-web/) (FastAPI, Django, and Databases)

---

## Interactive Practice

Think of one final logic feature for your game. If the player has a "Snake Charm", they can talk to the Forest Snake to get a clue. How would you write that `if` statement?

{{< mermaid >}}
flowchart TD
    Finish([Finish Course!]) --> Share[Share Progress]
    Share --> Certificate[Download Certificate]
    Certificate --> Path[Start Next Learning Path]
{{< /mermaid >}}

{{< quiz >}}
