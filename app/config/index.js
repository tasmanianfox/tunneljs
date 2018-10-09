const fs = require('fs');
const os = require('os');

let config = null;

const getConfigDir = () => `${os.homedir}/.tunneljs`
const getConfigPath = () => `${getConfigDir()}/config.json`

const initConfig = () => {
    if (!fs.existsSync(getConfigPath())) {
        config = {
            connections: [
                {
                    id: '1a79a4d60de6718e8e5b326e338ae533',
                    name: 'Example',
                    auth: {
                        user: 'root'
                    },
                    local: {
                        host: '127.0.0.1',
                        port: 3307
                    },
                    gate: {
                        host: 'example.com',
                        port: 22
                    },
                    target: {
                        host: '127.0.0.1',
                        port: 3306
                    }

                }
            ]
        };
    
        saveConfig();
    }

    const rawdata = fs.readFileSync(getConfigPath());  
    config = JSON.parse(rawdata);
};

const loadConfig = () => {
    if (config === null) {
        initConfig();
    }
    
    return config;
}

const saveConfig = () => {
    if (!fs.existsSync(getConfigDir())) {
        fs.mkdirSync(getConfigDir());
    }

    const json = JSON.stringify(config, null, 2);
    fs.writeFileSync(getConfigPath(), json);  
}

module.exports = {
    loadConfig
}