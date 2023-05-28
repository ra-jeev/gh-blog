const matter = require('gray-matter');
const { readFileSync } = require('fs');
const axios = require('axios');

// Function to create a draft on dev.to
async function createDraftPostOnDev(article) {
  try {
    const res = await axios.post(
      'https://dev.to/api/articles',
      { article },
      {
        headers: {
          'api-key': process.env.DEV_API_KEY,
          accept: 'application/vnd.forem.api-v1+json',
        },
      }
    );

    console.log(`Article posted successfully:  ${res.data.url}`);

    return res.data;
  } catch (error) {
    console.error('Failed to post the article:', error);
  }
}

// Function to parse Markdown file using gray-matter
function parseMarkdownFile(filename) {
  try {
    const fileContent = readFileSync(filename, 'utf8');
    const { data, content } = matter(fileContent);

    const post = {
      title: data.title,
      description: data.description,
      body_markdown: content,
      canonical_url:
        process.env.GH_PAGES_WEB_URL +
        filename.split('content')[1].replace('.md', ''),
    };

    if (data.image?.src) {
      post.main_image = process.env.GH_PAGES_WEB_URL + data.image.src;
    }

    console.log('final post', post);
    return post;
  } catch (error) {
    console.error('Error:', error);
  }
}

const main = async () => {
  const args = process.argv.slice(2);

  const filenames = JSON.parse(args[0]);

  const res = [];
  for (const file of filenames) {
    const post = parseMarkdownFile(file.filename);
    if (post) {
      const result = await createDraftPostOnDev(post);
      if (result) {
        res.push(result);
      }

      // Wait for 5 seconds before posting another article
      // This is to avoid getting 429 Too Many Requests error
      // from the dev.to API
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  console.log('res:', res);
};

main();
