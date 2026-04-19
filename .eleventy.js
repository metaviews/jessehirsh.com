module.exports = function(eleventyConfig) {
  // Prevent arrays in directory data files from concatenating with global data arrays.
  // Without this, currentFocus in fr/fr.json would append to _data/currentFocus.json
  // instead of replacing it, producing duplicate English+translated items on every page.
  eleventyConfig.setDataDeepMerge(false);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });

  eleventyConfig.addCollection("sitemap", function(collectionApi) {
    return collectionApi.getAll().filter((item) => {
      return item.outputPath &&
        item.outputPath.endsWith(".html") &&
        !item.data.noindex &&
        item.url !== "/404.html";
    });
  });

  eleventyConfig.addCollection("topics", function(collectionApi) {
    return collectionApi.getFilteredByTag("topics").sort((a, b) => {
      return (a.data.order || 99) - (b.data.order || 99);
    });
  });

  // Translated topic collections — add a tag here when adding a new language
  for (const tag of ["zhTopics", "frTopics", "deTopics", "esTopics"]) {
    eleventyConfig.addCollection(tag, function(collectionApi) {
      return collectionApi.getFilteredByTag(tag).sort((a, b) => {
        return (a.data.order || 99) - (b.data.order || 99);
      });
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
