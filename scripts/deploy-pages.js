// Publishes dist/ to the gh-pages branch of the origin remote (GitHub Pages "deploy from branch").
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const run = (cmd, cwd = 'dist') => execSync(cmd, { cwd, stdio: 'inherit' });
const remote = execSync('git remote get-url origin').toString().trim();
const sha = execSync('git rev-parse --short HEAD').toString().trim();

writeFileSync('dist/.nojekyll', '');
run('git init -q -b gh-pages');
run('git add -A');
run(`git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -qm "Deploy ${sha}"`);
run(`git push -f ${remote} gh-pages`);
run('rm -rf .git');
