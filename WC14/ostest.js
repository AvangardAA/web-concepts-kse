const os = require('os');

function getSystemInfo()
{
    const sysInfo =
        {
        osType: os.type(),
        osVersion: os.release(),
        cpuInfo: os.cpus(),
        is64Bit: os.arch() === 'x64',
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        userInfo: os.userInfo(),
    };
    return sysInfo;
}

console.log(getSystemInfo());
