# D-Kell Systems — before giving Codex the main prompt

## 1. Install/check your tools
Install Node.js active LTS from https://nodejs.org/en/download, Git from https://git-scm.com/downloads and VS Code from https://code.visualstudio.com/. Keep npm installed with Node. Restart VS Code after installing.
In a new PowerShell terminal run separately:

    node --version
    npm --version
    git --version

Each should print a version. Ask Codex to check that your Node release meets the current Nuxt stable requirement. If PowerShell blocks npm.ps1, use npm.cmd --version or a Command Prompt terminal; there is no need to weaken machine-wide script policy.
Install the Vue - Official extension in VS Code and use your existing signed-in Codex extension. Disable Vetur for this workspace if it is installed.

## 2. Create and clone the repository
On GitHub create a new private repository called dkell-systems. Add a README, Node .gitignore and no licence until you choose how the business code should be licensed. Keep it separate from your personal portfolio repository.
In VS Code press Ctrl+Shift+P, choose Git: Clone, paste the repository HTTPS URL, choose a parent directory (for example your Documents\Projects folder), then open the cloned repository. Confirm VS Code Explorer shows dkell-systems, not a different project.

## 3. Add this pack
Extract the ZIP using Windows Extract All. Copy the CONTENTS of dkell-systems-starter-pack into the repository root. Do not put the whole pack in a nested folder. Do not replace the repository .git folder. Keep an existing README and rename START-HERE only if needed.
You should see START-HERE.md, brand-reference, public, design and project-brief directly under dkell-systems. No package.json is expected yet: Codex will scaffold the app.

## 4. Add genuine business assets
If available, add the Gemsbyw logo to public/clients. SVG is ideal; otherwise use a sharp PNG, preferably transparent. Add approved project screenshots only if you may publish them and private customer information is removed. Missing assets do not block development.
Confirm your email and starting prices when ready. Do not substitute guessed values. You do not need to buy a domain before development.

## 5. Save the starting point
In VS Code Source Control review the files, stage them, enter 'Add D-Kell brand assets and project brief', commit, and choose Sync Changes/Push. If Git asks for your identity, set your own name and email in the instructions shown by Git. GitHub sign-in authorises the push; never paste access tokens into the project files.

## 6. Optional Firebase preparation
Visit https://console.firebase.google.com/ and create a project named D-Kell Systems. Choose a unique available project ID and write it down. Keep the project on Spark; Analytics is optional and not required for this website. No Firestore, Authentication, Storage, App Hosting or web SDK registration is required for static Hosting at this point.
You can defer this whole step until the local website works. Do not initialise Hosting manually yet; let Codex prepare the correct static output configuration after scaffolding. Firebase Hosting and Firebase App Hosting are different products.

## 7. Give Codex the prompt
Start Codex inside the repository root. Paste the full development prompt from the conversation, followed by the short instruction in project-brief/CODEX-HANDOFF.md or ask it to read that file. Tell it whether you created a Firebase project and supply only the project ID, not a credential or private key.
Tell Codex to preserve the pack while scaffolding into a nonempty directory. Ask it to implement and run the local version first. Do not run a separate Nuxt scaffold yourself on top of the same folder while Codex is working.

## Done before Codex
- Correct repository opened.
- node, npm and git return versions.
- Pack contents visible at root.
- Genuine client assets added if available.
- Starting files committed and pushed.
- Missing prices/email explicitly identified.

## Later
Local preview -> content and mobile review -> type/tests/build checks -> Firebase Hosting configuration -> deployment -> optional domain -> portfolio case study. The first working local version does not require Firebase billing, a domain purchase or a client portal.
