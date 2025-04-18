// Plugin Imports
const pluginDirectoryOutput = require("@11ty/eleventy-plugin-directory-output");
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");

const configCss = require("./src/config/css");
const configJs = require("./src/config/javascript");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");

const filterPostDate = require("./src/config/postDate");
const isProduction = configServer.isProduction;

module.exports = function (eleventyConfig) {
    /**
     *  PLUGINS
     *      Adds additional eleventy functionality through official or community-created add-ons
     *      https://www.11ty.dev/docs/plugins/
     */

    // Provides benchmarks in the terminal when a website is built. Useful for diagnostics.
    // https://www.11ty.dev/docs/plugins/directory-output/
    eleventyConfig.addPlugin(pluginDirectoryOutput);

    // Allows navigation items to be defined in a scalable way via the front matter
    // https://www.11ty.dev/docs/plugins/navigation/
    eleventyConfig.addPlugin(pluginEleventyNavigation);


    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCss);

    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", configJs);

    eleventyConfig.addPlugin(pluginEleventyNavigation);
    eleventyConfig.addPlugin(pluginSitemap, configSitemap);
    eleventyConfig.addPlugin(pluginMinifier);

    eleventyConfig.addFilter("postDate", filterPostDate);

    /**
     *  PASSTHROUGH'S
     *      Copy/paste non-template files straight to /public, without any interference from the eleventy engine
     *      https://www.11ty.dev/docs/copy/
     */
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");


    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.setServerOptions(configServer);

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};
