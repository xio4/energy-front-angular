/* eslint-disable import/no-commonjs, global-require */

const autoprefixer = require('autoprefixer');
const imageSetPolyfill = require('postcss-image-set-polyfill');
//const cssVariables = require('../constants/styles/index');
//const cssMediaVariables = require('../constants/styles/media');
//const cssCustomSelectors = require('../constants/styles/customSelectors');

module.exports = () => {
    return {
        plugins: [
            require('postcss-use')({ modules: '*' }),
            require('postcss-nested'),
//            require('postcss-custom-properties')({ variables: cssVariables }),
            require('postcss-at-rules-variables'),
            require('postcss-calc'),
//            require('postcss-custom-media')({ extensions: cssMediaVariables }),
//            require('postcss-custom-selectors')({ extensions: cssCustomSelectors }),
            require('postcss-conditionals'),
            require('postcss-color-function'),
            imageSetPolyfill,
            autoprefixer()
        ]
    };
};
