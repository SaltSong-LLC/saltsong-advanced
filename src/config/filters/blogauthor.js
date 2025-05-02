module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode("blogAuthor", function (author) {
        switch (author) {
            case "Adam":
                return `<img src="/assets/images/adam.jpg" width="32" height="32" decoding="async" alt="Adam" />`;
            case "Trina":
                return `<img src="/assets/images/trina.jpg" width="32" height="32" decoding="async" alt="Trina" />`;
            default:
                return "";
        }
    });
}


