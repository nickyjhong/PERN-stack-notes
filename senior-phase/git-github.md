# Git and GitHub
[⬅ Go Back](/README.md)

## Notes
### 1. Make an organization to share repo with everybody (only one person has to do this)
  - Top right corner (+)
  - Create organization
  - Organization account name: "2206-fsa-gs-team-_____"
    - Make the organization name relevant
  - Belongs to: my personal account
  - Add people by username or email
    - Also add instructors and mentors
  - Edit permissions (change role -> owner)
  - Create repo (make public to share and put in portfolio)

### 2. Use [boilerplate template](https://github.com/FullstackAcademy/fs-app-template)
  - Follow directions on FS-App-Template setup!
  - Merge boilerplate to organization repo (`push an existing repository from the command line` instructions)

### 3. Clone (DON'T FORK) the repo if you didn't create the repo

<br>
<br>

## Working in a team
### Fixing a merge conflict:
  - `git pull origin main`
  - Fix merge conflict
  - `git add .`
  - `git commit -m "fixed merge conflict"`
  - `git push`

### Branches (workspace for self and then combine branch to main) - avoid conflicts
*Branches should be featured based!*
  - `git checkout -b branchname`
  - Show all branches and * the one you're in: `git branch -a` 
  - `git add .`
  - `git commit -m "commitmessage"`
  - `git push origin branchname`
  - Pull request (fancy merge) to merge into main
    - New pull request (not merged just yet)
    - Get review
    - Merge and delete branch
      - Soft delete - can be restored
  - `git pull` before making a new branch