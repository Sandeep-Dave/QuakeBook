# Git Workflow

  Individuals will work on their own repo, and we'll be working off of a dev branch between the two of us and each person will cut a feature branch on the dev branch.   

# Pull Requests

  After making changes to their feature branch, each person will:
    - checkout the dev branch on their local repo
    - pull dev from upstream
    - checkout their feature branch
    - merge their dev branch into the feature branch
    - manage merge conflict on their feature branch
    - in Github, create a pull request (PR) on upstream
    - once PR is accepted, checkout dev branch on local repo
    - pull dev from upstream
    - push dev to origin
    - clean-up feature branches

  Both team members will have the right to merge PR's, but the ideal situation is team members don't merge their own PR's.  PR's are submitted principally with the aim that the other team member should review what has been submitted.  All communication will take place through Github.

# Testing

  Tests for a feature will not be written by the individiual responsible for creating the feature.  Tests will be written by the other person and pushed to a test folder in advance of work being done on the feature.  Once a team member is ready to work on the feature, they will follow the steps to get those test files on their local repo and begin building out the feature on their branch.  Features will not be merged until all tests passed.

# Github Issues

  We're going to utilize Github Issues to manage task-tracking and bug-tracking.            
