async function ensureServer(origin) {
    try {
        const res = await fetch(origin + '/');
        if (res.status) return;
    } catch {
        const url = new URL(origin);
        process.env.PORT = url.port || '3000';
        require('../../server');
        for (let i = 0; i < 30; i++) {
            try {
                const res = await fetch(origin + '/');
                if (res.status) return;
            } catch {
                await new Promise(r => setTimeout(r, 100));
            }
        }
        throw new Error('Failed to start test server on ' + origin);
    }
}

module.exports = { ensureServer };
