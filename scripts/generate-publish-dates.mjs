import { execSync } from 'node:child_process';
import { globSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { basename, extname } from "node:path";

const files = globSync('src/content/**/*.{md,mdx}');
const dates = {};

for (const file of files) {
    const output = execSync(
        `git log --follow --diff-filter=A --format=%aI -- "${file}"`,
        { encoding: 'utf-8' }
    ).trim();
    const id = basename(file, extname(file));
    dates[id] = output.split('\n')[0] || new Date().toISOString();
}

writeFileSync('src/publish-dates.json', JSON.stringify(dates, null, 2));
