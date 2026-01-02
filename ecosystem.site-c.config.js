module.exports = {
    apps: [
        {
            name: "api",
            cwd: "./apps/api/app",          // 너 실제 폴더명으로 수정
            script: "server.js",   // API build 산출물 경로로 수정
            exec_mode: "fork",
            instances: 1,
            env: {
                NODE_ENV: "production",
                PORT: 4000
            }
        },
        {
            name: "site-c",
            cwd: "./apps/site-c",
            script: "server.js",   // SvelteKit adapter-node 기준
            exec_mode: "fork",
            instances: 1,
            env: {
                NODE_ENV: "production",
                PORT: 4010
            }
        }
    ]
};