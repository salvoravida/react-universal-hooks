import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [{
    external: ['react'],
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: false,
            globals: {
                react: 'React',
            },
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/!**',
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                }],
                '@babel/preset-react',
            ],
        }),
    ],
},
];
