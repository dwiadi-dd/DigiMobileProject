import {faker} from '@faker-js/faker';

export const generateDummyPosts = (numPosts = 100) => {
  const posts = [];

  for (let i = 0; i < numPosts; i++) {
    const post = {
      avatar_url: faker.image.avatar(),
      name: faker.person.fullName(),
      headline: faker.person.jobTitle(),
      created_at: faker.date.recent().toISOString(),
      post_header: faker.person.bio(),
      post_content: faker.lorem.paragraph(),
      post_topic: faker.lorem.word(),
      post_upvote: faker.number.int({min: 0, max: 100}),
      post_downvote: faker.number.int({min: 0, max: 50}),
      post_comment: faker.number.int({min: 0, max: 20}),
      post_retweet: faker.number.int({min: 0, max: 20}),
    };

    posts.push(post);
  }

  return posts;
};

export const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} menit yang lalu`;
  } else if (hours < 24) {
    return `${hours} hari yang lalu`;
  } else if (days === 1) {
    return 'Kemarin';
  } else {
    return date.toLocaleDateString();
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
