const core = require('@actions/core');
const totp = require('steam-totp');

function run()
{
    try
    {
        const sharedSecret = core.getInput('shared_secret', { required: true });
        const timeOffset = parseInt(core.getInput('time_offset'));

        if(sharedSecret.length !== 28 || !sharedSecret.endsWith('='))
        {
            throw Error('Invalid shared secret.');
        }

        totp.getTimeOffset((error, offset, latency) => 
        {
            if(error)
            {
                throw error;
            }

            const code = totp.generateAuthCode(sharedSecret, offset + timeOffset);

            core.setSecret(code);
            core.setOutput('code', code);
        });
    }
    catch (error)
    {
        core.setFailed(error);
    }
}

run();
