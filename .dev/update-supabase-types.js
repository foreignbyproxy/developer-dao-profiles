const dotenv = require("dotenv");
const fs = require("fs");
const execSync = require("child_process").execSync;

const envConfig = dotenv.parse(fs.readFileSync(".env.local"));

console.log('Fetching Supabase types');

execSync(
	`npx -q openapi-typescript ${envConfig.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${envConfig.NEXT_PUBLIC_SUPABASE_KEY} --output types/supabase.ts`
);

console.log('Supabase types saved to ./types/supabase.ts');
