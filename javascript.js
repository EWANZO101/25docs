const fetch = require('node-fetch');

async function verifyTurnstile(token) {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secret: '0x4AAAAAAAywgyZBo1sr9BT8_8gql-DobUQ',
            response: token
        })
    });
    return response.json();
}
