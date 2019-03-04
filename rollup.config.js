import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
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
        external(),
        babel({
            exclude: 'node_modules/!**',
            plugins: ['external-helpers'],
        }),
        resolve(),
        commonjs(),
    ],
}
];
