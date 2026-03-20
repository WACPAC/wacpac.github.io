/**
 * GitHub Pages の URL 規則:
 * - プロジェクトサイト owner/repo → https://owner.github.io/repo/ （pathPrefix は /repo/）
 * - ユーザー/組織サイト owner/owner.github.io → https://owner.github.io/ （pathPrefix は /）
 *
 * CI の GITHUB_REPOSITORY が wacpac/wacpac.github.io なら自動でルート向けになる。
 */
function pathPrefixFromEnv() {
  const full = process.env.GITHUB_REPOSITORY;
  if (!full) return "/";
  const [owner, repo] = full.split("/");
  if (!owner || !repo) return "/";
  const o = owner.toLowerCase();
  const r = repo.toLowerCase();
  if (r === `${o}.github.io`) return "/";
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
