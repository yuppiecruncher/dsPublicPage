Digital Smith Public Landing Page
www.digitalsmith.work is registered and CNAME automatically configured

I probably won't revisit this code frequently so here's what I did: 

1. Ensure NPM is installed on machine. 

2. run NPM init in root directory
`npm init -y`

3. Install gh Pages 
`npm -i gh-pages`

4. Edit "scripts" in package.json: 
--replace "test" with "deploy": "gh-pages -d dist" if your desired public folder is "dist"
Note: this is the branch that GitHub Pages will pull from

5. Add "Homepage" in package.json: 
"homepage": "https://yuppiecruncher.github.io/dsPublicPage",

6. Created git repo "dsPublicPage"
    -Add .gitignore and add "node_modules" to this file
    -initialized git
    `git init`
    -commit files
    `git commit -m "commit message"`
    -Add remote (don't forget to add ssh keys if needed)
    `git remote add origin "git@github..."`
    -Push changes
    `git push -u origin master`

7. Deploy
    `npm run deploy`

In order to publish changes and automatically deploy: 
1. Commit changes and push to master
2. Run: `npm run deploy` in project directory