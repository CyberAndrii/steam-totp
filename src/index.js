const core = require('@actions/core');
const totp = require('steam-totp');

function run()
{
    try
    {
    	const sharedSecret = core.getInput('shared_secret', { required: true });
    	const timeOffset = core.getInput('time_offset');

    	const code = totp.generateAuthCode(sharedSecret, timeOffset);
        core.setOutput('code', code);
    }
    catch (error)
    {
        core.setFailed(error);
    }
}

run();
