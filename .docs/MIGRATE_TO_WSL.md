# Migrate to WSL

## How WSL File Access Works

### From Windows to WSL files:

- WSL filesystem is accessible via: \\wsl$\Ubuntu\home\username\
- Windows Explorer, cmd, PowerShell all work with this path
- Example: \\wsl$\Ubuntu\home\manwi\src\github\mws\compasslex-nextjs

### From WSL to Windows files:

- Windows drives are mounted at /mnt/c/, /mnt/d/, etc.
- Example: Your current C:\src\github\mws\* is /mnt/c/src/github/mws/\* in WSL

## Important Performance Consideration

Where you put your files matters:
Location: Windows filesystem (/mnt/c/...)
npm install speed: 🐌 Very slow
File I/O: Slow
Windows access: ✅ Native
Recommended for: Files you primarily use in Windows
────────────────────────────────────────
Location: WSL filesystem (~/...)
npm install speed: 🚀 Fast
File I/O: Fast
Windows access: ✅ Via \\wsl$\
 Recommended for: Development with Node/npm
For Node.js development, Microsoft strongly recommends keeping files in WSL filesystem due to the dramatic performance
difference in npm operations.

## VS Code Integration

VS Code has a Remote-WSL extension that makes this seamless:

1. Install "Remote - WSL" extension in VS Code
2. In WSL terminal, navigate to project: cd ~/src/github/mws/compasslex-nextjs
3. Run: code .
4. VS Code opens with full integration (terminal, debugger, extensions all work in WSL context)

From VS Code's perspective, it's like you're working natively - you won't even notice you're in WSL.

## Migration Plan (if you want to proceed)

1. Set up WSL (if not already installed)
2. Install Node.js in WSL (can use fnm/nvm or standalone)
3. Create directory structure in WSL: mkdir -p ~/src/github/mws
4. Copy one project as a test: cp -r /mnt/c/src/github/mws/compasslex-nextjs ~/src/github/mws/
5. Run npm install in WSL and compare speed
6. Test Claude Code in WSL
7. If satisfied, migrate other repos

## Accessing Files from Windows

You can:

- Browse in Explorer: \\wsl$\Ubuntu\home\<username>\src\github\mws
- Create a mapped drive for easier access (optional)
- Use VS Code Remote-WSL for editing (seamless)

## Quick Test

Want to do a quick test to see the performance difference and workflow? We could:

1. Check if you have WSL installed: wsl --version
2. If yes, copy just the compasslex-nextjs project to WSL
3. Run npm install and compare the speed
4. Test Claude Code from WSL
5. You can decide from there whether to fully migrate

Would you like to run this test? We can start by checking your current WSL setup.
