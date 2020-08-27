const core = require('@actions/core');
const totp = require('steam-totp');

function run()
{
    try
    {
    	const sharedSecret = core.getInput('shared_secret', { required: true });
    	const timeOffset = core.getInput('time_offset');

    	if(sharedSecret.length !== 28 || !sharedSecret.endsWith('='))
    	{
    		throw Error('Invalid shared secret.')
    	}

    	const code = totp.generateAuthCode(sharedSecret, timeOffset);
        core.setOutput('code', code);
    }
    catch (error)
    {
        core.setFailed(error);
    }
}

run();
