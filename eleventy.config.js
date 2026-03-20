/**
 * GitHub Pages: プロジェクトサイトは /repo-name/ 、ユーザー/組織の <user>.github.io はルート。
 * CI では GITHUB_REPOSITORY が自動で入るため、ローカルは常にルート前提でよい。
 */
function pathPrefixFromEnv() {
  const full = process.env.GITHUB_REPOSITORY;
  if (!full) return "/";
  const [owner, repo] = full.split("/");
  if (!owner || !repo) return "/";
  if (repo === `${owner}.github.io`) return "/";
  return `/${repo}/`;
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/posts/**/PICS/**");

  eleventyConfig.addFilter("isoDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date),
  );

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: pathPrefixFromEnv(),
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
