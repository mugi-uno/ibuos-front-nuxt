// https://github.com/nuxt-community/typescript-template/issues/48

module.exports = function() {
  // Add .ts & .tsx extension to Nuxt
  this.nuxt.options.extensions.push('ts', 'tsx');

  // Extend webpack build
  this.extendBuild(config => {
    // Add TypeScript
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: process.env.NODE_ENV !== 'production',
        appendTsSuffixTo: [/\.vue$/],
      },
    });

    // Add .ts extension in webpack resolve
    if (!config.resolve.extensions.includes('.ts')) {
      config.resolve.extensions.push('.ts');
    }

    // Add .tsx extension in webpack resolve
    if (!config.resolve.extensions.includes('.tsx')) {
      config.resolve.extensions.push('.tsx');
    }
  });
};
