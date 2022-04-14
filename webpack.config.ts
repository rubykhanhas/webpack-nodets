import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
/** TYPE DEF */
type WEBPACK_CLI_ENV = {
    production: boolean;
};
/** */

/** SETTING */
const OUT_DIR = 'dist';
/** */

export default function (env: WEBPACK_CLI_ENV): webpack.Configuration {
    return {
        mode: env.production ? 'production' : 'development',
        target: 'node',
        entry: './src/index.ts',
        watch: !env.production /* watch on dev mode */,
        output: {
            path: path.resolve(__dirname, OUT_DIR),
            filename: 'index.js',
        },
        devtool: env.production ? false : 'eval',
        externals: [nodeExternals()],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~': path.resolve(__dirname, './'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
            ],
        },
        plugins: [
            new WebpackShellPluginNext({
                onWatchRun: {
                    scripts: ['nodemon dist/index.js'],
                    blocking: false,
                    parallel: true,
                },
            }),
        ],
    };
}
