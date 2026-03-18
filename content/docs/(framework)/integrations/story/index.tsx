import { createFileSystemCache, defineStoryFactory } from '@fumadocs/story';
import { CalloutStory } from './client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const { defineStory } = defineStoryFactory({
  // use only on Vercel
  cache:
    process.env.NODE_ENV === 'production'
      ? createFileSystemCache('.next/fumadocs-story')
      : undefined,
});

export const story = defineStory(__filename, {
  displayName: 'Callout',
  Component: CalloutStory,
  args: [
    {
      variant: 'Default',
      initial: {
        title: 'This is a Callout',
      },
    },
    {
      variant: 'Warning',
      fixed: {
        type: 'warning',
      },
      initial: {
        title: 'This is a Callout',
      },
    },
  ],
});
