const CracoLessPlugin = require('craco-antd');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                customizeTheme: {
                    "@primary-color": "#1DA57A",
                    "@link-color": "#1DA57A"
                }
            },
        },
    ],
};