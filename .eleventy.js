module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

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